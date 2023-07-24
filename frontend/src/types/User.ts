import { toast } from "react-toastify";
import { BuisnessCardProps } from "./BuisnessCard";
import { AxiosResponse } from "axios";



interface UserProps {
    _id?: string,
    fName: string,
    mName?: string,
    lName: string,
    phone: string,
    email: string,
    password: string,
    imageUrl?: string,
    imageAlt?: string,
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: string,
    zip: string,
    biz?: boolean,
    admin?: boolean
    favorites?: Array<BuisnessCardProps>
}

  function signupValidation(user:UserProps):boolean {
      if (!user.fName || user.fName.length < 2 || !/^[a-zA-Z]+$/.test(user.fName)) {
        toast.error(
          "First name is required and gotta be only letters and more than 2 characters"
        );
        return false;
      }
      if (user.mName!==undefined) {
        if(user.mName.length !== 0){
        if(user.mName.length < 2 || !/^[a-zA-Z]+$/.test(user.mName)){
        toast.error(
          "Middle name gotta be only letters and more than 2 characters"
        );
        return false;
        }
      }
      }
      if (!user.lName || user.lName.length < 2 || !/^[a-zA-Z]+$/.test(user.lName)) {
        toast.error(
          "Last name is required and gotta be only letters and more than 2 characters"
        );
        return false;
      }
      if (!user.phone || !/^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g.test(user.phone)) {
        toast.error(
          "Phone is required and gotta be between 9-10 characters and valid"
        );
        return false;
      }
      if (!user.email || user.email.length < 9 || !/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(user.email)) {
        toast.error(
          "Email is required and gotta be more than 9 characters and valid"
        );
        return false;
      }
      if (!user.password || user.password.length < 8 || !/^[a-zA-Z0-9]{8,30}$/.test(user.password)) {
        toast.error(
          "Password is required and gotta be more than 8 characters and have one lower case letter, one upper case letter and a number"
        );
        return false;
      }
      if(user.imageUrl?.length !== 0){
        if(!/[/.](gif|jpg|jpeg|tiff|png|webp)$/i.test(user.imageUrl as string)){
        toast.error(
            "The URL you are trying to add does not include an image in the supported formats or it's got data:image in it. Those are the supported formats: gif, jpg, jpeg, tiff, png, webp"
        )
        return false
      }}
      if(user.state?.length !== 0){
        if(!/[a-zA-Z',.\s-]{2,}/.test(user.state as string)){
            toast.error('State field is not valid can only contain letters and must be at least 2 characters or empty')
            return false
        }
      }
      if(!user.country||!/[a-zA-Z ]{2,}/.test(user.country)){
        toast.error('Country field is not valid can only contain letters and must be at least 2 characters')
        return false
      }
      if(!user.city||!/[a-zA-Z',.\s-]{2,}/.test(user.city)){
        toast.error('City field is not valid can only contain letters and must be at least 2 characters')
        return false
      }
      if(!user.street||!/[a-zA-Z',.\s-]{2,}/.test(user.street)){
        toast.error('Street field is not valid can only contain letters and must be at least 2 characters')
        return false
      }
      if(!user.houseNumber||!/^[1-9]\d*(?: ?(?:[a-zA-Z]|[/-] ?\d+[a-zA-Z]?))?$/.test(user.houseNumber)){
        toast.error('House number field is not valid')
        return false
      }
      if(!user.zip||!/^\d{5}(?:[-\s]\d{4})?$/.test(user.zip)){
        toast.error('Zip code is invalid')
        return false
      }
      return true;
    }

    function loginValidation(email:UserProps['email'],password:UserProps['password'],response:AxiosResponse|undefined){
      if (!email || email.length < 9 || !/[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g.test(email)) {
        toast.error(
          "Email is required and gotta be more than 9 characters and valid"
        );
        return false;
      }
      if (!password || password.length < 8 || !/^[a-zA-Z0-9]{8,30}$/.test(password)) {
        toast.error(
          "Password is required and gotta be more than 8 characters and have one lower case letter, one upper case letter and a number"
        );
        return false;
      }
      return true
    }

export {
    signupValidation,
    loginValidation
};
export type { UserProps };
