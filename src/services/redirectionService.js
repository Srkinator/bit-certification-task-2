export default class RedirectionService {

    redirect(url){
        window.location.replace(`http://localhost:3000/#/${url}`); 
    }
}