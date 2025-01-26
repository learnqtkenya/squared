import React, { useState, useEffect } from 'react';
import { Gift, Snowflake, X } from 'lucide-react';

const CouponAd = () => {
  const [showAd, setShowAd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState('');
  const [showCouponAlert, setShowCouponAlert] = useState(false);

  useEffect(() => {
    // Check if user came from ad link
    const queryParams = new URLSearchParams(window.location.search);
    const fromAd = queryParams.get('from') === 'ad';
    setShowAd(fromAd);
  }, []);

  const handleGrabCoupon = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/grab-coupon`);
      const data = await response.json();
      
      if (response.ok) {
        setCoupon(data);
        setShowCouponAlert(true);
      } else {
        setError(data.error || 'Failed to get coupon');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
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
          <button
            onClick={handleGrabCoupon}
            disabled={loading}
            className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-100 transition-colors flex items-center justify-center space-x-2 mx-auto disabled:opacity-50"
          >
            <Gift className="h-5 w-5" />
            <span>{loading ? 'Getting your gift...' : 'Grab Your Gift!'}</span>
          </button>
        </div>
        <Snowflake className="h-8 w-8 animate-spin text-white/80" />
      </div>

      {showCouponAlert && coupon && (
        <div className="mt-4 p-4 rounded-lg bg-white text-green-600 border border-green-200">
          <p>
            🎉 Congratulations! Use code <span className="font-bold">{coupon.coupon_code}</span> for {coupon.discount_percentage}% off.
            Valid until {new Date(coupon.expires_at).toLocaleDateString()}
          </p>
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