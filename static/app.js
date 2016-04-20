var TRANSACTIONTYPE = {
    ADD : { value: 1 }, 
    EDIT : { value: 2 }, 
    DELETE : { value: 3 }
  };

$(document).ready(function(){
  
  Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  });

  function getDateFromDatatable(myDate) {
    splitedDate = myDate.split('/');
    var finalDate = splitedDate[1] + '/' + splitedDate[0] + '/' + splitedDate[2];
    return finalDate;
  }

  function Transaction (id, description, date, amount) {
    this.id = id;
    this.description = description;
    this.date = date;
    this.amount = amount;
  }
  function Transaction (array) {
    this.id = array[0];
    this.description = array[1];
    this.date = array[2];
    this.amount = array[3];
  }

  initialConfiguration();
  tableFunctions();
  AddButtonConfig();

  $("#transaction-modal").on('hidden.bs.modal', function (e) {
    $(this)
      .find("input,textarea,select")
        .val('')
        .end()
      .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end();
  });

  function configureModal (TransactionType, transactionItem ) {
    $("#modalSubmit").unbind();
    switch (TransactionType) {
      case TRANSACTIONTYPE.ADD: 
        $(".modal-title").text("Add Tranasction");
        $("#modalSubmit").on('click', function(){
          addTransaction();
        });
        break;
      case TRANSACTIONTYPE.EDIT: 
        $(".modal-title").text("Edit Tranasction");
        $("#modalSubmit").on('click', function (){
          editTransaction();
        });
        break;
      case TRANSACTIONTYPE.DELETE:
        break;
    }

    if (transactionItem != null){
      $("#transaction-description").val(transactionItem.description).text(transactionItem.description);
      $("#transaction-date").val(transactionItem.date);
      $("#transaction-amount").val(transactionItem.amount);
    } else {
      $("#transaction-date").val(new Date().toDateInputValue());
      // $("#transaction-amount").val(0.0);
    }

    $('#transaction-modal').modal('show');
  }

  function initialConfiguration (){
    $("#menu-toggle").click();  
    $('#transaction-table').DataTable();
    $(".paginate_button").on('click', tableFunctions());
  }

  function tableFunctions (){
    $('#transaction-table tbody').on('click', 'tr', function () {
      var tableRow = [];
      $(this).find('td').each(function(){  
        tableRow.push($(this).text());
      });
      var editableItem = new Transaction(tableRow);
      configureModal(TRANSACTIONTYPE.EDIT, editableItem);
    }); 
  }

  function AddButtonConfig () {
    $("#add-transaction-button").on('click', function (){
      configureModal(TRANSACTIONTYPE.ADD, null);
    })
  }

  function addTransaction (){
    console.log("ADD");
  }

  function editTransaction (){
    console.log("EDIT"); 
  }

});