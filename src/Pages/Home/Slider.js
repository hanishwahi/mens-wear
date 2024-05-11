import React from 'react'
import SimpleImageSlider from "react-simple-image-slider";
 function Slider() {
   const images = [
      { url: "https://img.freepik.com/free-photo/person-yard-sale-looking-bargains-amongst-miscellaneous-items_23-2151216841.jpg?t=st=1713963215~exp=1713966815~hmac=0cc6fe99fc473c317394f3f82e18d1caa92a18c1d4990e339a57ddd95df20171&w=996" },
      // { url: "https://images.pexels.com/photos/5490970/pexels-photo-5490970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { url: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
      { url: "https://img.freepik.com/free-photo/fast-fashion-concept-with-man-clothing-store_23-2150871304.jpg?t=st=1713963369~exp=1713966969~hmac=6a9e323b18ff611dd7e63a4ae1ec6a07c8f58800aedeed8cfa0533ebfd102218&w=996" },
   ];
   return (
      <>
         <div>
            <SimpleImageSlider
               width="100%"
               height={440}
               images={images}
               showBullets={true}
               showNavs={true}
               autoPlay={true}
            />
         </div>

      </>
   )
}

export default Slider