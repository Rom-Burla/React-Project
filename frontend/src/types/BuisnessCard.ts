import { toast } from "react-toastify"

interface BuisnessCardProps{
    _id?:string,
    buisnessName: string,
    buisnessSubtitle: string,
    buisnessNumber?:number,
    buisnessDescription:string,
    buisnessPhone: string,
    buisnessEmail: string,
    buisnessWebsite?: string,
    buisnessImage?: string,
    buisnessImageAlt?: string,
    address:{
        state?:string,
        street:string,
        houseNumber?:string,
        city:string,
        country:string
        zipCode?:string
    },
    user_id?:string
}

function BusinessValidation(Business:BuisnessCardProps):boolean{
    if(!Business.buisnessName||Business.buisnessName.length<2||!/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!@#$*&^%!]{2,20}$/.test(Business.buisnessName)){
        toast.error('Business name is required and gotta be more than 2 characters and less than 20 characters')
        return false
    }
    if(!Business.buisnessSubtitle||Business.buisnessSubtitle.length<2||!/^(?!\s)(?!.*\s$)(?=.*[a-zA-Z0-9])[a-zA-Z0-9 '~?!@#$*&^%!]{2,}$/.test(Business.buisnessSubtitle)){
        toast.error('Business Subtitle is required and gotta be more than 2 characters')
        return false
    }
    if(!Business.buisnessDescription||Business.buisnessDescription.length<2){
        toast.error('Business Description is required and gotta be more than 2 characters')
        return false
    }
    if (!Business.buisnessPhone || !/^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(Business.buisnessPhone)) {
        toast.error(
          "Phone is required and gotta be between 9-10 characters and valid"
        );
        return false;
      }
      if (!Business.buisnessEmail || Business.buisnessEmail.length < 9 || !/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(Business.buisnessEmail)) {
        toast.error(
          "Email is required and gotta be more than 9 characters and valid"
        );
        return false;
      }
      if(Business.buisnessWebsite!==undefined){
        if(Business.buisnessWebsite.length>0){
            if(
            !/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/.test(Business.buisnessWebsite)
            ){
                toast.error('Website is invalid')
                return false
            }
        }
      }
      if(Business.buisnessImage?.length !== 0){
        if(!/[/.](gif|jpg|jpeg|tiff|png|webp)$/i.test(Business.buisnessImage as string)){
        toast.error(
            "The URL you are trying to add does not include an image in the supported formats or it's got data:image in it. Those are the supported formats: gif, jpg, jpeg, tiff, png, webp"
        )
        return false
      }}
      if(Business.address.state?.length !== 0){
        if(!/[a-zA-Z',.\s-]{2,}/.test(Business.address.state as string)){
            toast.error('State field is not valid can only contain letters and must be at least 2 characters or empty')
            return false
        }
      }
      if(!Business.address.country||!/[a-zA-Z ]{2,}/.test(Business.address.country)){
        toast.error('Country field is not valid can only contain letters and must be at least 2 characters')
        return false
      }
      if(!Business.address.city||!/[a-zA-Z',.\s-]{2,}/.test(Business.address.city)){
        toast.error('City field is not valid can only contain letters and must be at least 2 characters')
        return false
      }
      if(!Business.address.street||!/[a-zA-Z',.\s-]{2,}/.test(Business.address.street)){
        toast.error('Street field is not valid can only contain letters and must be at least 2 characters')
        return false
      }
      if(!Business.address.houseNumber||!/^[1-9]\d*(?: ?(?:[a-zA-Z]|[/-] ?\d+[a-zA-Z]?))?$/.test(Business.address.houseNumber)){
        toast.error('House number field is not valid')
        return false
      }
      if(!Business.address.zipCode||!/^\d{5}(?:[-\s]\d{4})?$/.test(Business.address.zipCode)){
        toast.error('Zip code is invalid')
        return false
      }
      return true;
}



export { BusinessValidation }
export type { BuisnessCardProps }
