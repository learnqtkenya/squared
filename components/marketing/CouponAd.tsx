import React, { useState, useEffect } from 'react';
import { Gift, Snowflake, X, Copy, Check } from 'lucide-react';

interface CouponData {
  coupon_code: string;
  discount_percentage: number;
  expires_at: string;
}

interface StoredCouponData extends CouponData {
  generatedAt: string;
}

const STORAGE_KEY = 'squared_computing_coupon';
const COOLDOWN_PERIOD = 30 * 24 * 60 * 60 * 1000; 

const CouponAd = () => {
  const [showAd, setShowAd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState<CouponData | null>(null);
  const [error, setError] = useState('');
  const [showCouponAlert, setShowCouponAlert] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeUntilNextCoupon, setTimeUntilNextCoupon] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const fromAd = queryParams.get('from') === 'ad';
    setShowAd(fromAd);

    const storedCoupon = localStorage.getItem(STORAGE_KEY);
    if (storedCoupon) {
      const parsedCoupon: StoredCouponData = JSON.parse(storedCoupon);
      const generatedAt = new Date(parsedCoupon.generatedAt).getTime();
      const now = new Date().getTime();
      const timeDiff = now - generatedAt;

      if (timeDiff < COOLDOWN_PERIOD) {
        setCoupon(parsedCoupon);
        setShowCouponAlert(true);
        updateTimeRemaining(COOLDOWN_PERIOD - timeDiff);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const updateTimeRemaining = (timeLeft: number) => {
    const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeLeft % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    setTimeUntilNextCoupon(`${days} days and ${hours} hours`);
  };

  const handleGrabCoupon = async () => {
    const storedCoupon = localStorage.getItem(STORAGE_KEY);
    if (storedCoupon) {
      const parsedCoupon: StoredCouponData = JSON.parse(storedCoupon);
      const generatedAt = new Date(parsedCoupon.generatedAt).getTime();
      const now = new Date().getTime();
      const timeDiff = now - generatedAt;

      if (timeDiff < COOLDOWN_PERIOD) {
        setError(`You already have an active coupon. Please wait ${timeUntilNextCoupon} before generating a new one.`);
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/grab-coupon`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error) {
          setError(data.error);
          return;
        }
        throw new Error('Network response was not ok');
      }

      if (data && data.coupon_code) {
        const couponWithTimestamp: StoredCouponData = {
          ...data,
          generatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(couponWithTimestamp));
        
        setCoupon(data);
        setShowCouponAlert(true);
        updateTimeRemaining(COOLDOWN_PERIOD);
      } else {
        setError('No coupons available');
      }
    } catch (err) {
      const errorMessage = err instanceof Error
        ? err.message
        : 'Failed to get coupon';

      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  if (!showAd) return null;

  return (
    <div className="relative bg-gradient-to-r from-red-600 to-green-600 p-6 text-white rounded-lg shadow-lg mx-4 mb-8">
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setShowAd(false)}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <Snowflake className="h-8 w-8 animate-spin text-white/80" />
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">🎄 Special Offer! 🎁</h3>
          <p className="text-lg mb-4">Grab your exclusive discount coupon</p>
          {!showCouponAlert && (
            <button
              onClick={handleGrabCoupon}
              disabled={loading}
              className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-100 transition-colors flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
            >
              <Gift className="h-5 w-5" />
              <span>{loading ? 'Getting your gift...' : 'Grab Your Gift!'}</span>
            </button>
          )}
        </div>
        <Snowflake className="h-8 w-8 animate-spin text-white/80" />
      </div>

      {showCouponAlert && coupon && (
        <div className="mt-4 p-4 rounded-lg bg-white text-green-600 border border-green-200">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-center mb-2">
              🎉 Congratulations! Your discount code is:
            </p>
            <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
              <code className="font-mono text-lg font-bold">{coupon.coupon_code}</code>
              <button
                onClick={() => copyToClipboard(coupon.coupon_code)}
                className="ml-2 p-1 hover:bg-green-100 rounded-full transition-colors"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-green-600" />
                )}
              </button>
            </div>
            <p className="text-sm text-green-700">
              {copied ? 'Copied!' : 'Click the icon to copy'}
            </p>
            <p className="text-sm mt-2">
              Get {coupon.discount_percentage}% off. Valid until {new Date(coupon.expires_at).toLocaleDateString()}
            </p>
            {timeUntilNextCoupon && (
              <p className="text-xs text-gray-600 mt-2">
                You can generate a new coupon in {timeUntilNextCoupon}
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-lg bg-white/90 text-red-600 border border-red-200">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default CouponAd;