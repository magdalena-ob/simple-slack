export class LocalStorageService {
    lastURL: any;

    saveCurrentURL() {
        this.lastURL = window.location.href;
        //console.log('current url is' , this.lastURL);
        localStorage.setItem('url' , this.lastURL);
    }

    loadLastURL() {
        this.lastURL = localStorage.getItem('url');
        //console.log('letzt augerufene URL', this.lastURL);
    }
}