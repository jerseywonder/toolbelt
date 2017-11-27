export class Toolbelt {

    constructor() {

        var self = this

        // Random shuffle on arrays just like they did in underscore in the olden days
        Array.prototype.shuffle = function() {
          var i = this.length, j, temp;
          if ( i == 0 ) return this;
          while ( --i ) {
             j = Math.floor( Math.random() * ( i + 1 ) );
             temp = this[i];
             this[i] = this[j];
             this[j] = temp;
          }
          return this;
        }

    }

    // returns true for 1 or more matches, where 'a' is an array and 'b' is a search string or an array of multiple search strings
    contains(a, b) {
        // array matches
        if (Array.isArray(b)) {
            return b.some(x => a.indexOf(x) > -1);
        }
        // string match
        return a.indexOf(b) > -1;
    }

    readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    toTitleCase(string) {
        return string.toLowerCase().replace(/_/g, ' ').replace(/\b([a-z\u00C0-\u00ff])/g, function (_, initial) {
          return initial.toUpperCase();
        }).replace(/(\s(?:de|a|o|e|da|do|em|ou|[\u00C0-\u00ff]))\b/ig, function (_, match) {
          return match.toLowerCase();
        });
    }

    addCommasToNumbers(num) {
        var result = parseFloat(num).toFixed();
        result = result.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        return result
    }

    localStorage() {
        if (typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('verify', 'confirm');
                if (localStorage.getItem('verify') === 'confirm') {
                    localStorage.removeItem('verify');
                    //localStorage is enabled
                    this.localstore = true;
                } else {
                    //localStorage is disabled
                    this.localstore = false;
                }
            } catch(e) {
                //localStorage is disabled
                this.localstore = false;
            }
        } else {
            //localStorage is not available
            this.localstore = false;
        }
        return this.localstore
    }

    clearLocalStorage(target) {
        localStorage.removeItem(target);
    }

    getShareUrl() { 
        var isInIframe = (parent !== window);
        var parentUrl = null;
        shareUrl = (isInIframe) ? document.referrer : shareUrl = window.location.href;
        return shareUrl;  
    }

    getURLParams(paramName) {
        var searchString = window.location.search.substring(1),
            i, val, params = searchString.split("&");

        for (i = 0; i < params.length; i++) {
            val = params[i].split("=");
            if (val[0] == paramName) {
                return val[1];
            }
        }
        return null;
    }

    getParams(index) {

        var urlParams; 
        var params = {};

        var elements = document.getElementsByClassName('element-interactive');
        var el = elements[index];

        try {

            urlParams = el.getAttribute('data-alt').split('&');

        } catch(err) {

            console.log("Params: " + err)

        }

        if (urlParams) {

            urlParams.forEach(function(param){
             
                if (param.indexOf('=') === -1) {
                    params[param.trim()] = true;
                } else {
                    var pair = param.split('=');
                    params[ pair[0] ] = pair[1];
                }
                
            });

        }
        
        return (params.length > 0) ? params : false
        
    }

    mobileCheck() {
        
        var check = false;
        (function(a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
        })(navigator.userAgent || navigator.vendor || window.opera);
        var isiPad = navigator.userAgent.match(/iPad/i) != null;
        return (check || isiPad ? true : false);
    }

    vidFileType() {

        // Might be redundent now that most browsers surrpot MP4

        let sUsrAg = navigator.userAgent;

        if (sUsrAg.indexOf("Chrome") > -1) {

            return "mp4";

        } else if (sUsrAg.indexOf("Safari") > -1) {

            return "mp4";

        } else if (sUsrAg.indexOf("Opera") > -1) {

            return "oggv";

        } else if (sUsrAg.indexOf("Firefox") > -1) {

            return "webm";

        } else if (sUsrAg.indexOf("MSIE") > -1) {

            return "webm";

        } else {

            return "mp4";

        }

    }

}
