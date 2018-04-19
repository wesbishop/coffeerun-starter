$(function() {

  class CoffeeOrder {
    constructor(coffeeType,email,size,flavor,strength) {
      this.orderNumber = id;
      this.coffeeType = coffeeType;
      this.email = email || "";
      this.size = size || "";
      this.flavor = flavor || "";
      this.strength = strength || 0;
    }
  }

  class Orders {
    constructor(waitress) {
      this.waitress = waitress;
      this.orderNumber = 1;
      this.coffeeOrders = {};
    }
    
    addOrder(currentOrder) {
      this.coffeeOrders[id] = currentOrder;
    }

    deleteOrder(currentOrder) {
      delete this.coffeeOrders[currentOrder.orderNumber];
    }

  }

  // event listners
  $("form").submit(function(e) {

    e.preventDefault();

    let coffeeType = $("#coffeeType").val(),
        email = $("#emailInput").val(),
        size = $("input:checked").val();
        flavorShot = $("#flavorShot").val(),
        strength = $("#strengthLevel").val();

    id = ++allOrders.orderNumber;
    currentOrder = new CoffeeOrder(coffeeType);
    currentOrder.email = email;
    currentOrder.size = size;
    currentOrder.flavorShot = flavorShot;
    currentOrder.strength = strength;
    allOrders.addOrder(currentOrder);

    setLocalstorage(allOrders);
    renderOrders(allOrders);

    document.getElementById("form-coffee").reset(); 
    document.getElementById("coffeeType").focus();
    
  });

  $("#clear-items").click(function(e) {
    allOrders.coffeeOrders = {};
    setLocalstorage(allOrders);
    renderOrders(allOrders);
  })
  
  $("#orderList").on("click",".delete-order", function(e) {
    e.preventDefault();
    let orderNumber = $(this).parent().data("id");
    allOrders.deleteOrder(allOrders.coffeeOrders[orderNumber]);
    setLocalstorage(allOrders);
    renderOrders(allOrders);

  })

 
  
  function setLocalstorage(allOrders) {
    localStorage.setItem("coffeeOrders",JSON.stringify(allOrders.coffeeOrders));    
  }

  function getLocalstorage(allOrders) {
    allOrders.coffeeOrders = JSON.parse(localStorage.getItem("coffeeOrders")) ;
    let iLastOrderNumber = 0;
    for (const [key,value] of Object.entries(allOrders.coffeeOrders)) {
      iLastOrderNumber = (parseInt(value.orderNumber) > iLastOrderNumber) ? parseInt(value.orderNumber) : iLastOrderNumber;
    }
    allOrders.orderNumber = ++iLastOrderNumber;
    
  }

  function renderOrders(allOrders) {

    $("#orderList").empty();
    for (const [key, value] of Object.entries(allOrders.coffeeOrders)) {
      let renderedHTML = renderCoffeeOrderHTML(value);
      $("#orderList").append(renderedHTML);
    }
    setLocalstorage(allOrders);
  }

  function renderCoffeeOrderHTML(currentOrder) {
    var finalHTML = "<div class='order' data-id='" + currentOrder.orderNumber +"'>";
    finalHTML += "<span>" + currentOrder.coffeeType + "</span>";
    finalHTML += "<span>" + currentOrder.email + "</span>";
    finalHTML += "<span>" + currentOrder.size + "</span>";
    finalHTML += "<span>" + currentOrder.flavor + "</span>";
    finalHTML += "<span>" + currentOrder.strength + "</span>";
    finalHTML += "<span> </span>";
    finalHTML += "<button type='button' " ;
    finalHTML += "        class='btn btn-default align-right delete-order'>X</button>";
    finalHTML += "</div>";
    return finalHTML;
  }


   let allOrders = new Orders("Jane");
   if (localStorage.getItem("coffeeOrders") != null)  {
    getLocalstorage(allOrders);
   }

   renderOrders(allOrders);


  //reset should reload page


});