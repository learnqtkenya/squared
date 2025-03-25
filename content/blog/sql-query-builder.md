---
title: "Modern C++20 SQL Query Builder: Implementation Deep Dive"
date: "2025-03-24"
author: "Erick"
tags: ["SQL"]
excerpt: "Modern C++20 SQL Query Builder: Implementation Deep Dive"
coverImage: "/images/blog/sql-query-builder.png"
---

In this article, we'll explore the design and implementation of a high-performance, header-only SQL query builder for modern C++. We'll examine key design decisions, performance optimizations, and advanced usage patterns that make this library a robust choice for DB access layers.

## Design Philosophy

The SQL query builder was designed with several core principles in mind:

1. **Zero Runtime Overhead**: Use modern C++ features to move as much work as possible to compile time
2. **Type Safety**: Prevent common SQL injection vulnerabilities and type errors at compile time
3. **Minimal Dependencies**: Header-only implementation that works with any SQL backend
4. **Minimal Allocations**: Avoid heap allocations wherever possible for performance-critical code
5. **Fluent API**: Create a natural, discoverable interface that mimics SQL's structure

With these principles in mind, let's dive into the technical details.

## Template-Based Design

The library uses templates extensively to provide type safety while maintaining zero-cost abstractions:

```cpp
template<typename Config = DefaultConfig>
class QueryBuilder {
    // Implementation details...
};

template<typename Config = DefaultConfig>
class Column {
    // Implementation details...
};

template<typename Config = DefaultConfig>
class Condition {
    // Implementation details...
};
```

The `Config` parameter allows for compile-time customization without runtime overhead:

```cpp
struct CustomConfig {
    static constexpr size_t MaxColumns = 64;
    static constexpr size_t MaxConditions = 32;
    static constexpr size_t MaxJoins = 8;
    static constexpr size_t MaxOrderBy = 16;
    static constexpr size_t MaxGroupBy = 16;
    static constexpr bool ThrowOnError = true;
};
```

This template-based approach allows developers to fine-tune memory usage and behavior for specific use cases without compromising on performance.

## Memory Optimization with SmallVector

A key optimization is the implementation of `SmallVector`, a custom container that avoids heap allocations for common cases:

```cpp
template<typename T, size_t StaticSize = 8>
class SmallVector {
    size_t size_{0};
    std::array<T, StaticSize> static_storage_{};
    std::optional<std::vector<T>> dynamic_storage_{};
    
    // Implementation details...
};
```

This container stores elements on the stack up to `StaticSize`, and then seamlessly transitions to heap allocation only when needed. Each `QueryBuilder` instance uses multiple `SmallVector` instances:

```cpp
SmallVector<std::string_view, Config::MaxColumns> select_columns_;
SmallVector<Condition<Config>, Config::MaxConditions> where_conditions_;
SmallVector<Join<Config>, Config::MaxJoins> joins_;
// ...
```

For the majority of queries (which typically have few columns, conditions, and joins), this eliminates all heap allocations, significantly improving performance in critical code paths.

## Type Safety with Concepts

C++20 concepts provide compile-time type checks that help prevent common errors:

```cpp
template<typename T>
concept SqlCompatible =
    std::is_integral_v<std::remove_cvref_t<T>> ||
    std::is_floating_point_v<std::remove_cvref_t<T>> ||
    std::is_enum_v<std::remove_cvref_t<T>> ||
    std::same_as<std::remove_cvref_t<T>, std::string_view> ||
    std::same_as<std::remove_cvref_t<T>, std::string> ||
#ifdef SQLQUERYBUILDER_USE_QT
    is_qt_type<std::remove_cvref_t<T>>::value ||
#endif
    std::same_as<std::remove_cvref_t<T>, bool>;
```

This ensures that only appropriate types can be used in SQL conditions and values, providing clear error messages at compile-time rather than runtime SQL errors.

Operator overloading with these concepts provides intuitive query building:

```cpp
template<typename Config, SqlCompatible T>
inline Condition<Config> operator==(const Column<Config>& col, T&& val) {
    return col.eq(std::forward<T>(val));
}
```

## SQL Injection Prevention

SQL injection prevention is handled automatically through proper escaping in the `SqlValue::toSqlString()` method:

```cpp
[[nodiscard]] std::string toSqlString() const {
    return std::visit([](const auto& value) -> std::string {
        // Type-specific handling...
        if constexpr(std::is_same_v<T, std::string>) {
            std::string escaped = value;
            escapeString(escaped);
            return std::format("'{}'", escaped);
        }
        // ...
    }, storage_);
}

static void escapeString(std::string& str) {
    size_t pos = 0;
    while ((pos = str.find('\'', pos)) != std::string::npos) {
        str.replace(pos, 1, "''");
        pos += 2;
    }
}
```

This ensures proper escaping for all string values, preventing SQL injection vulnerabilities. The design guarantees that all user input is properly sanitized without requiring explicit developer action.

## Advanced Condition Building

The library uses the composite pattern to build complex conditions:

```cpp
Condition(const Condition& lhs, Op op, const Condition& rhs)
    : op_(op), left_(std::make_shared<Condition>(lhs)), right_(std::make_shared<Condition>(rhs)) {}

Condition operator&&(const Condition& other) const {
    return Condition(*this, Op::And, other);
}

Condition operator||(const Condition& other) const {
    return Condition(*this, Op::Or, other);
}
```

This enables natural, complex condition expressions:

```cpp
auto query = QueryBuilder()
    .select("*"sv)
    .from("users"sv)
    .where(
        (col("status") == UserStatus::Active) &&
        (
            (col("last_login") >= startDate) ||
            (col("is_admin") == true)
        )
    )
    .build();
```

The composite pattern allows for arbitrarily nested conditions while maintaining readability.

## Error Handling Strategy

The library provides two error handling strategies:

1. **Exception-based** (when `Config::ThrowOnError = true`):
   ```cpp
   try {
       auto query = builder.build();
   } catch (const QueryError& e) {
       std::cerr << "Error: " << e.message << std::endl;
   }
   ```

2. **Result-based** (when `Config::ThrowOnError = false`):
   ```cpp
   auto result = builder.buildResult();
   if (result.hasError()) {
       std::cerr << "Error: " << result.error().message << std::endl;
   } else {
       std::string query = result.value();
   }
   ```

The `Result<T>` class is inspired by Rust's `Result` type and provides a clean way to handle errors without exceptions:

```cpp
template<typename T>
class Result {
    std::variant<T, QueryError> value_;
public:
    Result(T value) : value_(std::move(value)) {}
    Result(QueryError error) : value_(std::move(error)) {}
    
    bool hasError() const { return std::holds_alternative<QueryError>(value_); }
    const QueryError& error() const { return std::get<QueryError>(value_); }
    const T& value() const { return std::get<T>(value_); }
    
    explicit operator bool() const { return !hasError(); }
};
```

## Integration with Qt

For projects using Qt, the library provides seamless integration:

```cpp
#ifdef SQLQUERYBUILDER_USE_QT
template<typename Config>
inline Condition<Config> operator==(const Column<Config>& col, const QString& val) {
    return col.eq(std::string_view(val.toStdString()));
}

template<typename Config>
inline Condition<Config> operator>=(const Column<Config>& col, const QDateTime& val) {
    return col.ge(val);
}
// Additional Qt-specific operators...
#endif
```

This makes it trivial to use with Qt's SQL modules or other Qt-based applications:

```cpp
#define SQLQUERYBUILDER_USE_QT
#include "sqlquerybuilder.hpp"

QDateTime startDate = QDateTime::currentDateTime().addDays(-7);
QString searchTerm = QString("search term");

auto query = QueryBuilder()
    .select("id"sv, "title"sv, "created_at"sv)
    .from("documents"sv)
    .where((col("created_at") >= startDate) &&
           (col("title").like("%" + searchTerm.toStdString() + "%")))
    .build();
```

## Compile-Time Optimizations

The library uses several compile-time optimization techniques:

1. **String view literals**: Using `std::string_view` avoids most string allocations and copies
2. **Compile-time constants**: Configuration parameters are `constexpr` for compiler optimizations
3. **constexpr estimations**: Query size estimation for optimal string reservations
4. **Static polymorphism**: Template-based design avoids virtual function overhead
5. **Auto-decltype return types**: Minimizes conversions and temporary objects

For example, string reservation is optimized based on query characteristics:

```cpp
[[nodiscard]] size_t estimateSize() const {
    size_t size = 64; // Base size
    size += table_.size();
    size += select_columns_.size() * 10;
    size += where_conditions_.size() * 30;
    size += joins_.size() * 40;
    // Additional components...
    return size;
}
```

This reduces reallocations during query building, improving performance for complex queries.

## Extension Points

The library has several extension points for advanced customization:

### Custom Value Types

Adding support for custom types:

```cpp
// Add a custom type trait
template<typename Config>
class SqlValue {
public:
    // Extend the storage type
    using StorageType = std::variant<
        std::monostate,
        int64_t,
        double,
        bool,
        std::string,
        // Add your custom type here
        MyCustomType
    >;

    // Add specialization in toSqlString
    [[nodiscard]] std::string toSqlString() const {
        return std::visit([](const auto& value) -> std::string {
            // Add your custom type handling
            if constexpr(std::is_same_v<T, MyCustomType>) {
                return value.toSqlString();
            }
            // ...
        }, storage_);
    }
};

// Update the concept
template<typename T>
concept SqlCompatible =
    // ... existing conditions ...
    std::same_as<std::remove_cvref_t<T>, MyCustomType>;
```

### Custom Query Features

The library can be extended with custom query features:

```cpp
template<typename Config = DefaultConfig>
class ExtendedQueryBuilder : public QueryBuilder<Config> {
public:
    // Inherit base constructors
    using QueryBuilder<Config>::QueryBuilder;
    
    // Add new features
    ExtendedQueryBuilder& forUpdate() {
        this->query_extras_ += " FOR UPDATE";
        return *this;
    }
    
    ExtendedQueryBuilder& withRecursive(std::string_view cte_name, std::string_view cte_query) {
        this->with_clauses_.push_back(std::format("WITH RECURSIVE {} AS ({})", cte_name, cte_query));
        return *this;
    }
};
```

## Limitations and Considerations

While the library offers substantial benefits, there are some limitations to be aware of:

1. **SQL Dialect Support**: The current implementation focuses on standard SQL, with some features that may be specific to PostgreSQL, MySQL, SQLite, etc.

2. **Maximum Collection Sizes**: The `SmallVector` optimization works best when collections stay under the maximum static size.

3. **Prepared Statements**: This library generates SQL strings but doesn't handle prepared statement bindings directly. For repeated queries, consider:

   ```cpp
   // For frequently executed queries
   const auto queryTemplate = QueryBuilder()
       .select("*")
       .from("users")
       .where(Column("id") == SqlValue("?"))  // Placeholder
       .build();
       
   // Later, in your DB code
   sqlite3_prepare_v2(db, queryTemplate.c_str(), -1, &stmt, nullptr);
   sqlite3_bind_int(stmt, 1, user_id);
   ```

4. **Debug Output**: In complex queries with many conditions, errors can be hard to trace. For debugging, use:

   ```cpp
   auto query = builder.build();
   std::cerr << "Generated SQL: " << query << std::endl;
   ```

## Real-World Example: Complex Query

Let's examine a more complex real-world example:

```cpp
// User repository implementation
std::vector<User> UserRepository::findActiveUsersByRoleWithRecentOrders(
    UserRole role,
    int daysSince,
    int minOrderAmount
) {
    auto dateThreshold = QDateTime::currentDateTime().addDays(-daysSince);
    
    auto query = QueryBuilder()
        .select(
            "u.id"sv, "u.name"sv, "u.email"sv, "u.created_at"sv,
            "COUNT(o.id) as order_count"sv,
            "SUM(o.amount) as total_spent"sv
        )
        .from("users u"sv)
        .innerJoin("user_roles ur"sv, "u.id = ur.user_id"sv)
        .leftJoin("orders o"sv, "u.id = o.user_id AND o.created_at >= :date_threshold"sv)
        .where(
            (col("ur.role_id") == static_cast<int>(role)) &&
            (col("u.active") == true) &&
            (col("u.verified") == true)
        )
        .groupBy("u.id"sv)
        .groupBy("u.name"sv)
        .groupBy("u.email"sv)
        .groupBy("u.created_at"sv)
        .having(std::format("SUM(o.amount) >= {}", minOrderAmount))
        .orderBy("total_spent"sv, false) // DESC
        .limit(100)
        .build();
        
    // Execute query and process results...
}
```

This example demonstrates how the library handles complex queries with multiple joins, conditions, aggregations, and parameters while maintaining readability and type safety.

## Conclusion

The SQL query builder presented here demonstrates how modern C++20 features can create a high-performance, type-safe abstraction with minimal overhead. By leveraging templates, concepts, and careful memory management, we've built a library that:

1. Provides strong compile-time safety guarantees
2. Minimizes runtime overhead and allocations
3. Creates readable, maintainable query code
4. Integrates cleanly with existing C++ codebases
5. Offers extensibility for diverse SQL dialects and custom types

For applications that require database access, this approach offers significant advantages over both raw SQL strings and heavyweight ORM solutions, striking a balance between performance and developer productivity.

---

*The complete implementation is available on GitHub at [github.com/learnqtkenya/sql-query-builder](https://github.com/learnqtkenya/sql-query-builder).*