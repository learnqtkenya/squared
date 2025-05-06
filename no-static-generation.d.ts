declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
    }
  }
  
  declare namespace NextPage {
    interface PageProps {
      params?: { [key: string]: string };
      searchParams?: { [key: string]: string | string[] | undefined };
    }
  }