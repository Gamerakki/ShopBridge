import _ from 'lodash';

export const isLogin = () => {
    return true
}

// Validates email address of course.
export const  validEmail =(e:any) => {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}
// the following script for min 8 letter password, with at least a symbol, upper and lower case letters and a number
export const  checkPassword = (str:any) => {
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(str);
}
// is used to serach the text in json data and return it back
export const searchByText = (collection:any, text:any, exclude:any) => {
    text = _.toLower(text);
    return _.filter(collection, function(object:any) {
      return _(object).omit(exclude).some(function(string:any) {
        return _(string).toLower().includes(text);
      });
    });
  }