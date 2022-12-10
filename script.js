let today = new Date();
let codeArray = [];
let count = 0;
let priceArray = [];
let quantityArray = [];
let discount = 0;
let preQuantity = 0;
$(document).ready(function () {

   initial();
})

function initial() {
   $('.cart').hide();
   $('#discounttitle').hide();
   $('#discountprice').hide();
   $('.card').click(function () {
      $('.cart').slideDown(2000);
      let pname = $(this).find('.pname').text();
      let code = $(this).find('.code').text();
      let image = $(this).find('img').attr('src');
      let price = $(this).find('.price').text();

      let clearprice = Number(price.replace("Ks ", ""));
      //deBugt
      //    console.log(pname);
      //    console.log(code);
      //    console.log(image);
      //    console.log(clearprice);

      let alreadyExist = false; // initital
      for (let index = 0; index < codeArray.length; index++) {
         if (codeArray[index] == code) {
            alert('This item have in the cart!');
            alreadyExist = true;
         }
      }

      if (!alreadyExist) {
         codeArray.push(code);
         priceArray.push(clearprice);
         quantityArray.push(1);
         console.log(codeArray);
         $(".calculateitem").append(`<div class="item">
            <img src="${image}"/>
            <div className="itemdetail">
            <p id="pname">${pname}</p>
            <p id="code">${code}</p>
            </div>
            <input type="text" value="1" class="quantity"/>
                <div class="delete" id="${count}"><ion-icon name="trash-outline"></ion></div>
            </div>`
         );
         count++;
         calculation();
      }

   });

   $(document).on('click', '.delete', function () {
      //console.log('delete');
      codeArray[this.id] = " ";
      quantityArray[this.id] = 0;
      console.log(quantityArray);
      $(this).closest('.item').remove();
      calculation();

   })
   checkDicsount();
}

$(document).on('focus', '.quantity', function () {
   preQuantity = Number($(this).val());

});

$(document).on('blur', ".quantity", function () { // calculation on cursor leve the box
   let newValue = Number($(this).val());
   if (newValue > 9 || newValue < 0) {
      alert("Allow 1 to 9 stock");
      (this).val(preQuantity);
   } else {
      let index = Number($(this).next(".delete")[0].id);//for array index
      quantityArray[index] = newValue;
      calculation();
   }
})

$(document).on('change', '#delivery', function () {
   calculation();
})

function calculation() {
   let totalitem = 0;
   let grandTotal = 0;
   let discountPrice = 0;
   let deli = Number($("#delivery").val());
   for (let index = 0; index < priceArray.length; index++) {
      totalitem += priceArray[index] * quantityArray[index];
   }
   grandTotal = totalitem;
   //console.log(grandTotal);
   if (discount) {
      discountPrice = totalitem * 0.15;
      console.log(discountPrice);
      $("#discountprice").text(discountPrice + " Ks");
   }
   $("#grand").text(grandTotal - discountPrice + deli + " Ks");


}


function checkDicsount() {
   if (today.getDay() == 0 || today.getDay() == 6) {
      if (today.getHours() >= 9 && today.getHours() <= 17) {
         $('#discounttitle').show();
         $('#discountprice').show();
         discount = true;
      }
   }
}
