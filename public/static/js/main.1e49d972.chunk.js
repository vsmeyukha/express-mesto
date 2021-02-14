(this["webpackJsonpmesto-react"]=this["webpackJsonpmesto-react"]||[]).push([[0],{16:function(e,t,a){},17:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(1),r=a.n(c),s=a(7),o=a.n(s),i=(a(16),a(10)),u=a(2);var l=function(){return Object(n.jsx)("header",{className:"header",children:Object(n.jsx)("div",{className:"logo"})})},p=a.p+"static/media/pencil.8667ac4a.svg",d=a.p+"static/media/plus.d86bb2ed.svg",j=r.a.createContext("currentUserContext");var _=function(e){var t=r.a.useContext(j),a=t.name,c=t.about,s=t.avatar;return Object(n.jsxs)("section",{className:"profile",children:[Object(n.jsxs)("div",{className:"profile__avatar",children:[Object(n.jsx)("button",{className:"profile__avatar-button",onClick:e.onEditAvatar,children:Object(n.jsx)("img",{src:p,alt:"\u043a\u0430\u0440\u0430\u043d\u0434\u0430\u0448",className:"profile__avatar-pencil"})}),Object(n.jsx)("img",{src:s,alt:"\u0410\u0432\u0430\u0442\u0430\u0440 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",className:"profile__avatar-image"})]}),Object(n.jsx)("h1",{className:"profile__name",children:a}),Object(n.jsx)("p",{className:"profile__regalia",children:c}),Object(n.jsx)("button",{className:"profile__edit-button",onClick:e.onEditProfile,children:Object(n.jsx)("img",{src:p,alt:"\u043a\u0430\u0440\u0430\u043d\u0434\u0430\u0448",className:"profile__pencil"})}),Object(n.jsx)("button",{className:"profile__add-button",onClick:e.onAddPlace,children:Object(n.jsx)("img",{src:d,alt:"\u043f\u043b\u044e\u0441",className:"profile__plus"})})]})};var b=function(e){var t=r.a.useContext(j)._id,a=e.card.owner._id===t,c="card__delete-card ".concat(a?"":"card__delete-card_invisible"),s=e.card.likes.some((function(e){return e._id===t})),o="card__like-button ".concat(s?"card__like-button_active":"");return Object(n.jsxs)("div",{className:"card",children:[Object(n.jsx)("img",{src:e.card.link,alt:e.card.name,className:"card__img",onClick:function(){return e.card.link,void e.onCardClick(e.card)}}),Object(n.jsx)("button",{className:c,onClick:e.onCardDelete}),Object(n.jsxs)("div",{className:"card__name",children:[Object(n.jsx)("h2",{className:"card__title",children:e.card.name}),Object(n.jsxs)("div",{className:"card__like",children:[Object(n.jsx)("button",{className:o,onClick:e.onLikeClick}),Object(n.jsx)("p",{className:"card__like-scope",children:e.card.likes.length})]})]})]})};var h=function(e){return Object(n.jsx)("section",{className:"cards",children:e.cards.map((function(t){return Object(n.jsx)(b,{card:t,onCardClick:e.onCardClick,onLikeClick:function(){return e.onCardLike(t)},onCardDelete:function(){return e.onCardDelete(t)}},t._id)}))})};var m=function(e){return Object(n.jsxs)("main",{className:"main",children:[Object(n.jsx)(_,{onEditProfile:e.onEditProfile,onAddPlace:e.onAddPlace,onEditAvatar:e.onEditAvatar}),Object(n.jsx)(h,{onCardClick:e.onCardClick,cards:e.cards,onCardLike:e.onCardLike,onCardDelete:e.onCardDelete})]})};var f=function(){return Object(n.jsx)("footer",{className:"footer",children:Object(n.jsx)("p",{className:"footer__info",children:"\xa9  2020 Mesto Russia. Dev: Victor Smeyukha"})})};var O=function(e){return Object(n.jsx)("div",{className:"photo-popup ".concat(e.card?"popup_opened":""),children:Object(n.jsxs)("figure",{className:"photo-popup__container",children:[Object(n.jsx)("button",{className:"popup__close-button popup__close-button_type_photo-popup",type:"button",onClick:e.onClose}),Object(n.jsx)("img",{src:e.card.link,alt:e.card.name,className:"photo-popup__image"}),Object(n.jsx)("figcaption",{className:"photo-popup__caption",children:e.card.name})]})})},v=a(3),x=a(8),C=a(9),k=new(function(){function e(t,a){Object(x.a)(this,e),this.headers={authorization:t},this.baseUrl=a}return Object(C.a)(e,[{key:"_getResponseData",value:function(e,t,a,n){return fetch(e,{method:t,headers:a,body:n}).then((function(e){return e.ok?e.json():Promise.reject()}))}},{key:"getInitialCards",value:function(){return this._getResponseData("".concat(this.baseUrl,"/cards"),"GET",this.headers)}},{key:"addNewCard",value:function(e){return this._getResponseData("".concat(this.baseUrl,"/cards"),"POST",Object(v.a)(Object(v.a)({},this.headers),{},{"Content-Type":"application/json"}),JSON.stringify(e))}},{key:"deleteCard",value:function(e){return this._getResponseData("".concat(this.baseUrl,"/cards/").concat(e),"DELETE",this.headers)}},{key:"getUserInfo",value:function(){return this._getResponseData("".concat(this.baseUrl,"/users/me"),"GET",this.headers)}},{key:"getAllNeededData",value:function(){return Promise.all([this.getUserInfo(),this.getInitialCards()])}},{key:"editProfile",value:function(e){return this._getResponseData("".concat(this.baseUrl,"/users/me"),"PATCH",Object(v.a)(Object(v.a)({},this.headers),{},{"Content-Type":"application/json"}),JSON.stringify(e))}},{key:"changeAvatar",value:function(e){return this._getResponseData("".concat(this.baseUrl,"/users/me/avatar"),"PATCH",Object(v.a)(Object(v.a)({},this.headers),{},{"Content-Type":"application/json"}),JSON.stringify(e))}},{key:"addALike",value:function(e){return this._getResponseData("".concat(this.baseUrl,"/cards/likes/").concat(e),"PUT",this.headers)}},{key:"deleteLike",value:function(e){return this._getResponseData("".concat(this.baseUrl,"/cards/likes/").concat(e),"DELETE",this.headers)}},{key:"changeLikeCardStatus",value:function(e,t){return t?this.addALike(e):this.deleteLike(e)}}]),e}())("2dbd0122-ea43-4557-862d-f5c5a66a918e","https://mesto.nomoreparties.co/v1/cohort-18");var g=function(e){return Object(n.jsx)("div",{className:"popup popup_type_".concat(e.name," ").concat(e.isOpen?"popup_opened":""),children:Object(n.jsxs)("div",{className:"popup__container",children:[Object(n.jsx)("button",{className:"popup__close-button popup__close-button_type_popup-with-forms",type:"button",onClick:e.onClose}),Object(n.jsx)("h3",{className:"popup__title",children:e.title}),Object(n.jsxs)("form",{className:"popup__form popup__form_type_".concat(e.name),name:e.name,noValidate:!0,onSubmit:e.onSubmit,children:[Object(n.jsx)("fieldset",{className:"popup__fieldset popup__fieldset_type_".concat(e.name),children:e.children}),Object(n.jsx)("button",{type:"submit",className:"popup__submit",value:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",name:"submit",children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]})]})})};var N=function(e){var t=r.a.useState(""),a=Object(u.a)(t,2),c=a[0],s=a[1],o=r.a.useState(""),i=Object(u.a)(o,2),l=i[0],p=i[1],d=r.a.useContext(j);return r.a.useEffect((function(){s(d.name),p(d.about)}),[d]),Object(n.jsxs)(g,{title:"\u041a\u0430\u043a \u0437\u0432\u0430\u0442\u044c-\u0442\u043e \u0442\u0435\u0431\u044f?",name:"user-info",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(t){t.preventDefault(),e.onUpdateUser({name:c,about:l})},children:[Object(n.jsx)("input",{type:"text",className:"popup__input popup__input_type_name",placeholder:"\u0418\u043c\u044f",name:"user-name",required:!0,minLength:"2",maxLength:"40",id:"user-name",value:c,onChange:function(e){s(e.target.value)}}),Object(n.jsx)("span",{className:"popup__input-error",id:"user-name-error"}),Object(n.jsx)("input",{type:"text",className:"popup__input popup__input_type_regalia",placeholder:"\u0420\u043e\u0434 \u0434\u0435\u044f\u0442\u0435\u043b\u044c\u043d\u043e\u0441\u0442\u0438",name:"user-regalia",required:!0,minLength:"2",maxLength:"200",id:"user-regalia",value:l,onChange:function(e){p(e.target.value)}}),Object(n.jsx)("span",{className:"popup__input-error",id:"user-regalia-error"})]})};var y=function(e){var t=r.a.useRef("");return Object(n.jsxs)(g,{title:"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",name:"change-avatar",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(a){a.preventDefault(),e.onUpdateAvatar({avatar:t.current.value})},children:[Object(n.jsx)("input",{type:"url",className:"popup__input popup__input_type_avatar-link",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u0430\u0432\u0443",name:"avatar-link",required:!0,id:"avatar-link",ref:t}),Object(n.jsx)("span",{className:"popup__input-error",id:"avatar-link-error"})]})};var D=function(e){var t=r.a.useRef(""),a=r.a.useRef("");return Object(n.jsxs)(g,{title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",name:"add-new-card",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(n){n.preventDefault(),e.onAddPlace({name:t.current.value,link:a.current.value})},children:[Object(n.jsx)("input",{type:"text",className:"popup__input popup__input_type_card-title",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0438",name:"card-title",required:!0,maxLength:"30",id:"card-title",ref:t}),Object(n.jsx)("span",{className:"popup__input-error",id:"card-title-error"}),Object(n.jsx)("input",{type:"url",className:"popup__input popup__input_type_card-link",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",name:"card-link",required:!0,id:"card-link",ref:a}),Object(n.jsx)("span",{className:"popup__input-error",id:"card-link-error"})]})};var S=function(){var e=r.a.useState({name:"",about:"",avatar:"",_id:""}),t=Object(u.a)(e,2),a=t[0],c=t[1];r.a.useEffect((function(){k.getUserInfo().then((function(e){c(e)})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0438 \u0434\u0430\u043d\u043d\u044b\u0445 \u043f\u0440\u043e\u0444\u0438\u043b\u044f: ".concat(e))}))}),[]);var s=r.a.useState([]),o=Object(u.a)(s,2),p=o[0],d=o[1];r.a.useEffect((function(){k.getInitialCards().then((function(e){d(e)})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043e\u0447\u043a\u0430 \u0432\u044b\u0448\u043b\u0430 - ".concat(e))}))}),[]);var _=r.a.useState(!1),b=Object(u.a)(_,2),h=b[0],v=b[1],x=r.a.useState(!1),C=Object(u.a)(x,2),g=C[0],S=C[1],L=r.a.useState(!1),P=Object(u.a)(L,2),E=P[0],U=P[1],A=r.a.useState(null),R=Object(u.a)(A,2),T=R[0],w=R[1];function I(){v(!1),S(!1),U(!1),w(null)}return Object(n.jsx)(j.Provider,{value:a,children:Object(n.jsx)("div",{className:"page",children:Object(n.jsxs)("div",{className:"page__content",children:[Object(n.jsx)(l,{}),Object(n.jsx)(m,{onEditProfile:function(){v(!0)},onAddPlace:function(){U(!0)},onEditAvatar:function(){S(!0)},onCardClick:function(e){w(e)},cards:p,onCardLike:function(e){var t=e.likes.some((function(e){return e._id===a._id}));k.changeLikeCardStatus(e._id,!t).then((function(t){var a=p.map((function(a){return a._id===e._id?t:a}));d(a)})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u043b\u0430\u0439\u043a\u0430: ".concat(e))}))},onCardDelete:function(e){k.deleteCard(e._id).then((function(t){var a=p.filter((function(t){if(t._id!==e._id)return t}));d(a)})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u0443\u0434\u0430\u043b\u0435\u043d\u0438\u044f \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0438: ".concat(e))}))}}),Object(n.jsx)(f,{}),Object(n.jsx)(N,{isOpen:h,onClose:I,onUpdateUser:function(e){k.editProfile(e).then((function(e){c(e),I()})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0438 \u0434\u0430\u043d\u043d\u044b\u0445 \u043f\u0440\u043e\u0444\u0438\u043b\u044f: ".concat(e))}))}}),Object(n.jsx)(y,{isOpen:g,onClose:I,onUpdateAvatar:function(e){k.changeAvatar(e).then((function(e){c(e),I()})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0440\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0438 \u0430\u0432\u0430\u0442\u0430\u0440\u0430: ".concat(e))}))}}),Object(n.jsx)(D,{isOpen:E,onClose:I,onAddPlace:function(e){k.addNewCard(e).then((function(e){d([e].concat(Object(i.a)(p))),I()})).catch((function(e){return console.error("\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u0440\u0438 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u0438 \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u044f: ".concat(e))}))}}),Object(n.jsx)("div",{className:"popup popup_type_submit",children:Object(n.jsxs)("div",{className:"popup__container",children:[Object(n.jsx)("button",{className:"popup__close-button popup__close-button_type_popup-with-forms",type:"button"}),Object(n.jsx)("h3",{className:"popup__title",children:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?"}),Object(n.jsx)("button",{type:"submit",className:"popup__submit",value:"\u0414\u0430",name:"submit",children:"\u0414\u0430"})]})}),T&&Object(n.jsx)(O,{card:T,onClose:I})]})})})},L=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,18)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};o.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(S,{})}),document.getElementById("root")),L()}},[[17,1,2]]]);
//# sourceMappingURL=main.1e49d972.chunk.js.map