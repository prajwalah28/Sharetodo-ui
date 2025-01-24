import React, { useEffect } from 'react';

const Add = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (

    <>
    <div>This is Add</div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100px' }}
        data-ad-client="ca-pub-3246126532167532"
        data-ad-slot="8795178683"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
    </>
  );
};

export default Add;
