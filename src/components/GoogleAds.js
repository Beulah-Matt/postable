import React, { useEffect } from 'react';

const GoogleAds = ({ slot }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins 
     className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-7087263933197152"
     data-ad-slot={slot}
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
  );
};

export default GoogleAds;