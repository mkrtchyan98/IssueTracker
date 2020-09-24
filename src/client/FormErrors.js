function validateForm(field) {

            let formIsValid = true;

            //Name
            if(!field){
               formIsValid = false;
               console.log( "Cannot be empty");

            }
      
            if( typeof field !== "undefined"){
               if(!field.match(/^[a-zA-Z]+$/)){
                  formIsValid = false;
                  console.log( "Only letters");
               }        
            }
           return formIsValid;
       }
        

        export default validateForm