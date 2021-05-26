(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/de2":
/*!********************************************************!*\
  !*** ./src/app/user-profile/user-profile.component.ts ***!
  \********************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/user-data.service */ "DPk/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







function UserProfileComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Name cannot be blank.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserProfileComponent_span_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Enter a 10 digit valid phone number. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserProfileComponent_div_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Profile updated! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserProfileComponent_div_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Some error occurred. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class UserProfileComponent {
    constructor(userDataService, router, route, handleLocalStorageService) {
        this.userDataService = userDataService;
        this.router = router;
        this.route = route;
        this.handleLocalStorageService = handleLocalStorageService;
        this.pathVar = '';
        this.isUpdateSuccess = false;
        this.isUpdateFailure = false;
        // get the path variable
        this.pathVar = this.route.snapshot.params['name'];
    }
    ngOnInit() {
        // show 404 if profile path name doesn't match logged in user's username
        if (this.pathVar != '' && this.pathVar != undefined) {
            let _name = this.makeProfilePath(this.handleLocalStorageService.getUserName());
            if (this.pathVar != _name) {
                this.router.navigate(['not-found']);
            }
        }
        this.userDataSub = this.userDataService
            .getUserDataObservable()
            .subscribe((data) => {
            this.userData = data;
            if (this.userData != undefined) {
                if (this.userData.name != undefined) {
                    this.userProfileForm.patchValue({
                        name: this.userData.name,
                    });
                }
                if (this.userData.phone != undefined) {
                    this.userProfileForm.patchValue({
                        phone: this.userData.phone,
                    });
                }
                if (this.userData.email != undefined) {
                    this.userProfileForm.patchValue({
                        email: this.userData.email,
                    });
                }
                if (this.userData.address != undefined) {
                    this.userProfileForm.patchValue({
                        address: this.userData.address,
                    });
                }
                /* if (this.userData.role != undefined && this.userData.role.val != undefined) {
                this.userProfileForm.patchValue({
                  role: this.userData.role.val
                });
                */
            }
        });
        // creating reactive signup form
        this.userProfileForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](this.userData.name, [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required]),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](this.userData.phone, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].pattern('^((\\+91-?)|0)?[0-9]{10}$'),
            ]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](this.userData.email),
            address: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](this.userData.address),
            role: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"](this.userData.role.val),
        });
    }
    ngOnDestroy() {
        this.userDataSub.unsubscribe();
    }
    // updates user data
    onUpdate() {
        // handle the case when disabled attribute for submit button is deleted
        // from html
        if (this.userProfileForm.invalid) {
            return;
        }
        this.userData.name = this.userProfileForm.get('name').value;
        this.userData.phone = this.userProfileForm.get('phone').value;
        this.userData.address = this.userProfileForm.get('address').value;
        this.userDataService.setUid = this.userData.uid;
        this.userDataService
            .updateUserData(this.userData)
            .then(() => {
            this.isUpdateSuccess = true;
            let _name;
            _name = this.makeProfilePath(this.userDataService.getName);
            this.router.navigate(['profile', _name]);
        })
            .catch(() => {
            this.isUpdateFailure = true;
        });
        setTimeout(() => {
            this.isUpdateFailure = this.isUpdateSuccess = false;
        }, 2000);
    }
    /** utility functions */
    replaceUndefinedOrNull(v) {
        if (v == undefined || v == null) {
            return ' ';
        }
        return v;
    }
    /** make profile path from name of the user */
    makeProfilePath(v) {
        return v.split(' ').join('-');
    }
}
UserProfileComponent.ɵfac = function UserProfileComponent_Factory(t) { return new (t || UserProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_data_service__WEBPACK_IMPORTED_MODULE_2__["UserDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["HandleLocalStorageService"])); };
UserProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserProfileComponent, selectors: [["app-user-profile"]], decls: 32, vars: 6, consts: [[1, "container", "profile-div"], [1, "row"], [1, "col-xs-12", "col-md-6", "col-md-offset-3"], [2, "margin-bottom", "40px"], [3, "formGroup", "ngSubmit"], [1, "form-group"], ["for", "exampleInputEmail1"], ["type", "name", "formControlName", "name", 1, "form-control"], ["class", "error-text", 4, "ngIf"], ["type", "phone", "formControlName", "phone", 1, "form-control"], ["type", "email", "formControlName", "email", "readonly", "", 1, "form-control"], ["type", "address", "formControlName", "address", 1, "form-control"], ["type", "role", "formControlName", "role", "readonly", "", 1, "form-control"], ["class", "alert alert-success mx-auto", "role", "alert", 4, "ngIf"], ["class", "alert alert-danger mx-auto", "role", "alert", 4, "ngIf"], ["type", "submit", 1, "btn", "btn-md", "btn-primary", 3, "disabled"], [1, "error-text"], ["role", "alert", 1, "alert", "alert-success", "mx-auto"], ["role", "alert", 1, "alert", "alert-danger", "mx-auto"]], template: function UserProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h2", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Your profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "form", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function UserProfileComponent_Template_form_ngSubmit_5_listener() { return ctx.onUpdate(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, UserProfileComponent_span_10_Template, 2, 0, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Phone");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, UserProfileComponent_span_15_Template, 2, 0, "span", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Email");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](19, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Address");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Role");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, UserProfileComponent_div_28_Template, 2, 0, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, UserProfileComponent_div_29_Template, 2, 0, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, " Update ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.userProfileForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.userProfileForm.controls.name.errors != null && ctx.userProfileForm.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.userProfileForm.controls.phone.errors != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isUpdateSuccess == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isUpdateFailure == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.userProfileForm.valid);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: [".profile-div[_ngcontent-%COMP%] {\r\n    padding-top: 100px;\r\n    padding-bottom: 180px;\r\n    min-height: 70vh;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    margin-bottom: 20px;\r\n}\r\n\r\nlabel[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n    font-weight: 400;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXItcHJvZmlsZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCIiwiZmlsZSI6InVzZXItcHJvZmlsZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2ZpbGUtZGl2IHtcclxuICAgIHBhZGRpbmctdG9wOiAxMDBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxODBweDtcclxuICAgIG1pbi1oZWlnaHQ6IDcwdmg7XHJcbn1cclxuXHJcbi5mb3JtLWdyb3VwIHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "/xLE":
/*!**************************************************!*\
  !*** ./src/app/cart-page/cart-page.component.ts ***!
  \**************************************************/
/*! exports provided: CartPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartPageComponent", function() { return CartPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _services_handle_cart_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/handle-cart.service */ "PqqQ");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function CartPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "No items in cart.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return [a0]; };
function CartPageComponent_div_7_div_1_div_1_div_12_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CartPageComponent_div_7_div_1_div_1_div_12_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r6.onRemove(item_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CartPageComponent_div_7_div_1_div_1_div_12_Template_span_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit; const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r9.onAdd(item_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, item_r3.quantity));
} }
function CartPageComponent_div_7_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h5", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, CartPageComponent_div_7_div_1_div_1_div_12_Template, 8, 3, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", item_r3.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](item_r3.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate3"](" \u20B9", item_r3.price, " \u00D7 ", item_r3.quantity, " = \u20B9", ctx_r4.getItemTotalAmount(item_r3.price, item_r3.quantity), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r3.quantity > 0);
} }
function CartPageComponent_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CartPageComponent_div_7_div_1_div_1_Template, 13, 7, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", item_r3.quantity > 0);
} }
function CartPageComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CartPageComponent_div_7_div_1_Template, 2, 1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CartPageComponent_div_7_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.clearCart(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Clear cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r1.cartArray);
} }
class CartPageComponent {
    constructor(handleLocalStorageService, handleCartService, router) {
        this.handleLocalStorageService = handleLocalStorageService;
        this.handleCartService = handleCartService;
        this.router = router;
        this.cartArray = [];
        this.isCartEmpty = true;
        this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
    }
    ngOnInit() {
        this.populateCartData();
        // hide bottom cart bar when viewing cart page
        this.handleCartService.goToOrders(true);
    }
    ngOnDestroy() {
        // show bottom cart bar when cart page component is destroyed
        this.handleCartService.goToOrders(false);
    }
    populateCartData() {
        if (this.cartObj != null && this.cartObj.items != undefined) {
            this.isCartEmpty = false;
            const itemD = this.cartObj.items;
            for (let item in itemD) {
                const itemObj = itemD[item];
                const obj = {
                    id: itemObj.itemId,
                    name: itemObj.name,
                    category: itemObj.category,
                    price: itemObj.price,
                    imageUrl: itemObj.imageUrl,
                    quantity: itemObj.quantity,
                };
                this.cartArray.push(obj);
            }
        }
        else {
            this.isCartEmpty = true;
        }
    }
    /** add to cart */
    onAdd(item) {
        item.quantity += 1; //two-way binded
        this.handleCartService.addOrUpdate(item);
    }
    /** remove from cart */
    onRemove(item) {
        item.quantity -= 1; //two-way binded
        this.handleCartService.removeItem(item);
        // if not items in cart
        // set isCartEmpty to true
        this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
        if (this.cartObj == null) {
            this.isCartEmpty = true;
        }
    }
    getItemTotalAmount(price, quantity) {
        return Number(price) * Number(quantity);
    }
    clearCart() {
        this.isCartEmpty = true;
        this.cartArray = [];
        this.cartObj = null;
        this.handleCartService.clearCart();
    }
}
CartPageComponent.ɵfac = function CartPageComponent_Factory(t) { return new (t || CartPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["HandleLocalStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_handle_cart_service__WEBPACK_IMPORTED_MODULE_2__["HandleCartService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"])); };
CartPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CartPageComponent, selectors: [["app-cart-page"]], decls: 8, vars: 2, consts: [[1, "cart-page"], [1, "album", "py-5"], [1, "container"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], ["class", "text-center", 4, "ngIf"], [4, "ngIf"], [1, "text-center"], [4, "ngFor", "ngForOf"], [1, "text-center", "cart-btn-group"], [1, "form-group"], [1, "btn", "btn-outline-danger", 3, "click"], ["class", "card mb-3 mx-auto", "style", "max-width: 700px;", 4, "ngIf"], [1, "card", "mb-3", "mx-auto", 2, "max-width", "700px"], [1, "row", "g-0"], [1, "col-md-4"], [1, "item-image", 3, "src"], [1, "col-md-8"], [1, "card-body"], [1, "card-title"], [1, "badge", "bg-light", "text-dark", "item-category"], [1, "card-text", "item-price"], ["class", "btn-toolbar", "role", "toolbar", 4, "ngIf"], ["role", "toolbar", 1, "btn-toolbar"], ["role", "group", "aria-label", "-", 1, "btn-group"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "text-center", 2, "width", "30px"], ["type", "button", 1, "btn", "btn-outline-success", "btn-sm", 3, "click"]], template: function CartPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Your Cart");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, CartPageComponent_div_6_Template, 3, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, CartPageComponent_div_7_Template, 6, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isCartEmpty == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isCartEmpty == false);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: ["div[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n}\r\n\r\n.cart-page[_ngcontent-%COMP%] {\r\n    min-height: 120vh;\r\n    padding-top: 80px;\r\n}\r\n\r\nimg[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 200px;\r\n    object-fit: cover;\r\n}\r\n\r\n.card-title[_ngcontent-%COMP%] {\r\n    font-size: 25px;\r\n}\r\n\r\n.item-category[_ngcontent-%COMP%] {\r\n    font-size: 15px;\r\n}\r\n\r\n.item-price[_ngcontent-%COMP%] {\r\n    font-size: 19px;\r\n    color: rgb(68, 68, 68);\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n    border-radius: 1.3em;\r\n}\r\n\r\ndiv.card[_ngcontent-%COMP%] {\r\n    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\r\n}\r\n\r\ndiv.card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-0.1rem) scale(1);\r\n    box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.item-category[_ngcontent-%COMP%] {\r\n    white-space: pre-wrap;\r\n    font-size: 14px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.cart-btn-group[_ngcontent-%COMP%] {\r\n    margin-top: 80px;\r\n    margin-bottom: 100px;\r\n}\r\n\r\n\r\n\r\n@media (min-width: 1281px) {\r\n    .item-image[_ngcontent-%COMP%] {\r\n        border-top-left-radius: 1.3em;\r\n        border-bottom-left-radius: 1.3em;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 1025px) and (max-width: 1280px) {\r\n    .item-image[_ngcontent-%COMP%] {\r\n        border-top-left-radius: 1.3em;\r\n        border-bottom-left-radius: 1.3em;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) {\r\n    .item-image[_ngcontent-%COMP%] {\r\n        border-top-left-radius: 1.3em;\r\n        border-bottom-left-radius: 1.3em;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {\r\n    .item-image[_ngcontent-%COMP%] {\r\n        border-top-left-radius: 1.3em;\r\n        border-bottom-left-radius: 1.3em;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    .item-image[_ngcontent-%COMP%] {\r\n        border-top-left-radius: 1.3em;\r\n        border-top-right-radius: 1.3em;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    .item-image[_ngcontent-%COMP%] {\r\n        border-top-left-radius: 1.3em;\r\n        border-top-right-radius: 1.3em;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQtcGFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksaUJBQWlCO0lBQ2pCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0lBQ2Ysc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksZ0NBQWdDO0lBQ2hDLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGlEQUFpRDtBQUNyRDs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QyxpREFBaUQ7QUFDckQ7O0FBRUE7SUFDSSxxQkFBcUI7SUFDckIsZUFBZTtJQUNmLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixvQkFBb0I7QUFDeEI7O0FBR0E7OztDQUdDOztBQUVEO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsZ0NBQWdDO0lBQ3BDO0FBQ0o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsZ0NBQWdDO0lBQ3BDO0FBQ0o7O0FBR0E7OztDQUdDOztBQUVEO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsZ0NBQWdDO0lBQ3BDO0FBQ0o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsZ0NBQWdDO0lBQ3BDO0FBQ0o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsOEJBQThCO0lBQ2xDO0FBQ0o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0k7UUFDSSw2QkFBNkI7UUFDN0IsOEJBQThCO0lBQ2xDO0FBQ0oiLCJmaWxlIjoiY2FydC1wYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJkaXYge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiS2FybGFcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLmNhcnQtcGFnZSB7XHJcbiAgICBtaW4taGVpZ2h0OiAxMjB2aDtcclxuICAgIHBhZGRpbmctdG9wOiA4MHB4O1xyXG59XHJcblxyXG5pbWcge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG4gICAgb2JqZWN0LWZpdDogY292ZXI7XHJcbn1cclxuXHJcbi5jYXJkLXRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMjVweDtcclxufVxyXG5cclxuLml0ZW0tY2F0ZWdvcnkge1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG59XHJcblxyXG4uaXRlbS1wcmljZSB7XHJcbiAgICBmb250LXNpemU6IDE5cHg7XHJcbiAgICBjb2xvcjogcmdiKDY4LCA2OCwgNjgpO1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgICBmb250LWZhbWlseTogXCJLYXJsYVwiLCBzYW5zLXNlcmlmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMS4zZW07XHJcbn1cclxuXHJcbmRpdi5jYXJkIHtcclxuICAgIGJveC1zaGFkb3c6IHJnYmEoMTQ5LCAxNTcsIDE2NSwgMC4yKSAwcHggOHB4IDI0cHg7XHJcbn1cclxuXHJcbmRpdi5jYXJkOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC4xcmVtKSBzY2FsZSgxKTtcclxuICAgIGJveC1zaGFkb3c6IDAgMC41ZW0gM3JlbSAtMXJlbSByZ2JhKDAsIDAsIDAsIDAuNSk7XHJcbn1cclxuXHJcbi5pdGVtLWNhdGVnb3J5IHtcclxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5jYXJ0LWJ0bi1ncm91cCB7XHJcbiAgICBtYXJnaW4tdG9wOiA4MHB4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICAjI0RldmljZSA9IERlc2t0b3BzXHJcbiAgIyNTY3JlZW4gPSAxMjgxcHggdG8gaGlnaGVyIHJlc29sdXRpb24gZGVza3RvcHNcclxuKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAxMjgxcHgpIHtcclxuICAgIC5pdGVtLWltYWdlIHtcclxuICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxLjNlbTtcclxuICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxLjNlbTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBMYXB0b3BzLCBEZXNrdG9wc1xyXG4gICAgIyNTY3JlZW4gPSBCL3cgMTAyNXB4IHRvIDEyODBweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSBhbmQgKG1heC13aWR0aDogMTI4MHB4KSB7XHJcbiAgICAuaXRlbS1pbWFnZSB7XHJcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMS4zZW07XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMS4zZW07XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICAjI0RldmljZSA9IFRhYmxldHMsIElwYWRzIChwb3J0cmFpdClcclxuICAjI1NjcmVlbiA9IEIvdyA3NjhweCB0byAxMDI0cHhcclxuKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkgYW5kIChtYXgtd2lkdGg6IDEwMjRweCkge1xyXG4gICAgLml0ZW0taW1hZ2Uge1xyXG4gICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEuM2VtO1xyXG4gICAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEuM2VtO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IFRhYmxldHMsIElwYWRzIChsYW5kc2NhcGUpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA3NjhweCB0byAxMDI0cHhcclxuICAqL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcclxuICAgIC5pdGVtLWltYWdlIHtcclxuICAgICAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxLjNlbTtcclxuICAgICAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxLjNlbTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBMb3cgUmVzb2x1dGlvbiBUYWJsZXRzLCBNb2JpbGVzIChMYW5kc2NhcGUpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA0ODFweCB0byA3NjdweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNDgxcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgLml0ZW0taW1hZ2Uge1xyXG4gICAgICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEuM2VtO1xyXG4gICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxLjNlbTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBNb3N0IG9mIHRoZSBTbWFydHBob25lcyBNb2JpbGVzIChQb3J0cmFpdClcclxuICAgICMjU2NyZWVuID0gQi93IDMyMHB4IHRvIDQ3OXB4XHJcbiAgKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAuaXRlbS1pbWFnZSB7XHJcbiAgICAgICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMS4zZW07XHJcbiAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEuM2VtO1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\MyData\MyGitRepos\restaurant-order-management-system\src\main.ts */"zUnb");


/***/ }),

/***/ "0Gr/":
/*!***************************************************!*\
  !*** ./src/app/global/navbar/navbar.component.ts ***!
  \***************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user-data.service */ "DPk/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");






const _c0 = function () { return ["/login"]; };
function NavbarComponent_li_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Log in");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
} }
const _c1 = function () { return ["/sign-up"]; };
function NavbarComponent_li_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Sign up");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c1));
} }
function NavbarComponent_li_17_a_10_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_li_17_a_10_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5.onManageItems(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Manage Items");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NavbarComponent_li_17_a_11_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_li_17_a_11_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r7.onManageOrders(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Manage Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function NavbarComponent_li_17_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_li_17_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.visitProfile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_li_17_Template_a_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.onMyCart(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "My Cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_li_17_Template_a_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r12.onMyOrders(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "My Orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, NavbarComponent_li_17_a_10_Template, 2, 0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, NavbarComponent_li_17_a_11_Template, 2, 0, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NavbarComponent_li_17_Template_a_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r13.onLogOut(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Log out");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Hi, ", ctx_r2.displayName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.isAdmin == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r2.isAdmin == true);
} }
const _c2 = function () { return [""]; };
const _c3 = function () { return ["menu-page"]; };
class NavbarComponent {
    constructor(authService, userDataService, router, handleLocalStorageService) {
        this.authService = authService;
        this.userDataService = userDataService;
        this.router = router;
        this.handleLocalStorageService = handleLocalStorageService;
        this.isAuthenticated = false;
        this.displayName = null;
        this.isAdmin = false;
        // get name and isAuthenticated values from local storage if they are present there
        this.displayName = this.handleLocalStorageService.getUserName();
        this.isAuthenticated = this.handleLocalStorageService.getIsAuthenticated() == 'true' ? true : false;
        this.isAdmin = this.handleLocalStorageService.getIsAdmin() == 'true' ? true : false;
        this.isAuthSub = this.authService
            .getIsAuthObservable()
            .subscribe((data) => {
            this.isAuthenticated = data;
        });
        // using observer pattern for getting name here
        // because if name gets updated in profile,
        // it will update the displayName too.
        this.userDataSub = this.userDataService
            .getUserDataObservable()
            .subscribe((data) => {
            if (data != null && data.name != null) {
                this.displayName = data.name;
            }
        });
        // get isAdmin data
        this.isAdminSub = this.userDataService.getIsAdminObservable().subscribe(data => {
            if (data != null) {
                this.isAdmin = data;
            }
        });
    }
    ngOnInit() { }
    ngOnDestroy() {
        this.isAuthSub.unsubscribe();
        this.userDataSub.unsubscribe();
    }
    onLogOut() {
        this.displayName = null;
        this.isAuthenticated = false;
        this.userDataService.clearUserDataLocally();
        this.authService.logOut();
    }
    visitProfile() {
        let _name;
        _name = this.userDataService.getName.split(' ').join('-');
        this.router.navigate(['profile', _name]);
    }
    onManageItems() {
        this.router.navigate(['admin/items']);
    }
    onMyCart() {
        this.router.navigate(['cart']);
    }
    onMyOrders() {
        this.router.navigate(['orders']);
    }
    onManageOrders() {
        this.router.navigate(['admin/manage-orders']);
    }
}
NavbarComponent.ɵfac = function NavbarComponent_Factory(t) { return new (t || NavbarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_2__["UserDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["HandleLocalStorageService"])); };
NavbarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavbarComponent, selectors: [["app-navbar"]], decls: 18, vars: 9, consts: [["id", "navbar-container", 1, "container"], ["aria-label", "Eighth navbar example", 1, "navbar", "navbar-expand-lg", "navbar-light", "bg-white"], [1, "container"], [1, "navbar-brand", 3, "routerLink"], ["type", "button", "data-bs-toggle", "collapse", "data-bs-target", "#navbarsExample07", "aria-controls", "navbarsExample07", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarsExample07", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", 2, "margin-left", "auto"], [1, "nav-item"], ["data-bs-toggle", "collapse", "data-bs-target", ".navbar-collapse.show", 1, "nav-link", 3, "routerLink"], ["class", "nav-item", 4, "ngIf"], ["class", "nav-item dropdown", 4, "ngIf"], [1, "nav-item", "dropdown"], ["href", "#", "id", "navbarDropdown", "role", "button", "data-toggle", "dropdown", "aria-haspopup", "true", "aria-expanded", "false", 1, "nav-link", "dropdown-toggle"], ["aria-labelledby", "navbarDropdown", 1, "dropdown-menu", "dropdown-menu-lg-end"], ["data-bs-toggle", "collapse", "data-bs-target", ".navbar-collapse.show", 1, "dropdown-item", 3, "click"], ["class", "dropdown-item", "data-bs-toggle", "collapse", "data-bs-target", ".navbar-collapse.show", 3, "click", 4, "ngIf"]], template: function NavbarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "21 Club");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "ul", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Home");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "li", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Menu");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, NavbarComponent_li_15_Template, 3, 2, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, NavbarComponent_li_16_Template, 3, 2, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, NavbarComponent_li_17_Template, 14, 3, "li", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](6, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c2));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c3));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isAuthenticated == false && ctx.displayName == null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isAuthenticated == false && ctx.displayName == null);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isAuthenticated == true && ctx.displayName != null);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"]], styles: [".navbar-brand[_ngcontent-%COMP%] {\r\n    font-size: 40px;\r\n    font-family: \"Pacifico\", cursive;\r\n}\r\n\r\n#navbar-container[_ngcontent-%COMP%] {\r\n    margin-top: 35px;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%] {\r\n    font-size: 22px;\r\n    color: black;\r\n}\r\n\r\n.nav-item[_ngcontent-%COMP%] {\r\n    padding-left: 10px;\r\n}\r\n\r\na.close-icon[_ngcontent-%COMP%], a.close-icon[_ngcontent-%COMP%]:hover {\r\n    color: inherit;\r\n    text-decoration: none;\r\n}\r\n\r\n.dropdown[_ngcontent-%COMP%]:hover   .dropdown-menu[_ngcontent-%COMP%] {\r\n    display: block;\r\n    margin-top: 0;\r\n}\r\n\r\n.dropdown-item[_ngcontent-%COMP%] {\r\n    cursor: pointer;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLGdDQUFnQztBQUNwQzs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBOztJQUVJLGNBQWM7SUFDZCxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkIiLCJmaWxlIjoibmF2YmFyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2YmFyLWJyYW5kIHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIlBhY2lmaWNvXCIsIGN1cnNpdmU7XHJcbn1cclxuXHJcbiNuYXZiYXItY29udGFpbmVyIHtcclxuICAgIG1hcmdpbi10b3A6IDM1cHg7XHJcbn1cclxuXHJcbi5uYXYtbGluayB7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5uYXYtaXRlbSB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcbn1cclxuXHJcbmEuY2xvc2UtaWNvbixcclxuYS5jbG9zZS1pY29uOmhvdmVyIHtcclxuICAgIGNvbG9yOiBpbmhlcml0O1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uZHJvcGRvd246aG92ZXIgLmRyb3Bkb3duLW1lbnUge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG59XHJcblxyXG4uZHJvcGRvd24taXRlbSB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "0Gxy":
/*!************************************************!*\
  !*** ./src/app/services/item-image.service.ts ***!
  \************************************************/
/*! exports provided: ItemImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemImageService", function() { return ItemImageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/storage */ "Vaw3");






class ItemImageService {
    constructor(afdb, storage) {
        this.afdb = afdb;
        this.storage = storage;
        this.basePath = '/uploads/images/';
        this.imageUrl = '';
        this.imageUrlSub = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    // upload image file to Firebase storage
    pushImageToStorage(file, itemCategory) {
        const filePath = this.basePath + itemCategory + '/' + file.name;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);
        uploadTask
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(() => {
            storageRef.getDownloadURL().subscribe((downloadUrl) => {
                this.imageUrl = downloadUrl;
                this.imageUrlSub.next(this.imageUrl);
            });
        }))
            .subscribe((data) => {
            // console.log(data);
        });
        return uploadTask.percentageChanges();
    }
    deleteImage(imageUrl) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.storage.refFromURL(imageUrl).delete().toPromise();
        });
    }
    getimageUrlObservable() {
        return this.imageUrlSub.asObservable();
    }
}
ItemImageService.ɵfac = function ItemImageService_Factory(t) { return new (t || ItemImageService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__["AngularFireDatabase"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_storage__WEBPACK_IMPORTED_MODULE_5__["AngularFireStorage"])); };
ItemImageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ItemImageService, factory: ItemImageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "4hB0":
/*!******************************************************************!*\
  !*** ./src/app/admin/display-orders/display-orders.component.ts ***!
  \******************************************************************/
/*! exports provided: DisplayOrdersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayOrdersComponent", function() { return DisplayOrdersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_order_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/order-data.service */ "kS/D");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../global/loader/loader.component */ "yPJz");






function DisplayOrdersComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-loader");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function DisplayOrdersComponent_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "The customer hasn't ordered anything yet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function DisplayOrdersComponent_div_14_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const oi_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate4"](" ", oi_r5.name, ": \u20B9", oi_r5.price, " \u00D7 ", oi_r5.quantity, " = \u20B9", ctx_r4.getItemTotalAmount(oi_r5.price, oi_r5.quantity), " ");
} }
function DisplayOrdersComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h5", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, DisplayOrdersComponent_div_14_div_9_Template, 3, 4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " (inclusive of 18 %GST) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const order_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Order # ", order_r3.orderNo, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" placed on ", order_r3.addedOn, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("ID: ", order_r3.orderId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", order_r3.orderedItems);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Total amount paid: \u20B9", order_r3.totalAmt, "");
} }
const _c0 = function () { return ["/admin/manage-orders"]; };
class DisplayOrdersComponent {
    constructor(orderDataService, route) {
        this.orderDataService = orderDataService;
        this.route = route;
        this.orderArray = [];
        this.isLoading = true;
        this.isLoaded = false;
        this.userName = this.route.snapshot.queryParams['name'];
        this.uid = this.route.snapshot.params['uid'];
    }
    ngOnInit() {
        this.fetchOrderData();
    }
    fetchOrderData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isLoaded = false;
            this.isLoading = true;
            this.orders = yield this.orderDataService.getOrderDataById(this.uid);
            let count = 0;
            for (let orderId in this.orders) {
                count++;
                const orderObj = this.orders[orderId];
                const oia = [];
                for (let oi in orderObj.orderedItems) {
                    const o = {
                        name: orderObj.orderedItems[oi].name,
                        price: orderObj.orderedItems[oi].price,
                        quantity: orderObj.orderedItems[oi].quantity,
                    };
                    oia.push(o);
                }
                const obj = {
                    orderNo: count,
                    orderId: orderObj.orderId,
                    addedOn: orderObj.addedOn,
                    orderedItems: oia,
                    totalAmt: orderObj.totalAmt,
                };
                this.orderArray.push(obj);
            }
            // reverse it to show latest order first
            this.orderArray.reverse();
            this.isLoaded = true;
            this.isLoading = false;
        });
    }
    getItemTotalAmount(price, quantity) {
        return Number(price) * Number(quantity);
    }
}
DisplayOrdersComponent.ɵfac = function DisplayOrdersComponent_Factory(t) { return new (t || DisplayOrdersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_order_data_service__WEBPACK_IMPORTED_MODULE_2__["OrderDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"])); };
DisplayOrdersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DisplayOrdersComponent, selectors: [["app-display-orders"]], decls: 15, vars: 6, consts: [[1, "my-order-page"], [1, "album", "py-5"], [1, "container"], [1, "d-flex", "flex-row-reverse", 2, "margin-bottom", "30px"], [1, "p-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "routerLink"], [1, "fa", "fa-arrow-left"], [2, "margin-left", "3px", "margin-bottom", "10px"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], [4, "ngIf"], ["class", "text-center", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "text-center"], [1, "card", "mx-auto", 2, "max-width", "700px"], [1, "card-header"], [1, "card-body"], [1, "card-title"], [1, "card-text"]], template: function DisplayOrdersComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "i", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Back to manage orders ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "span", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, DisplayOrdersComponent_div_12_Template, 2, 0, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, DisplayOrdersComponent_div_13_Template, 3, 0, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, DisplayOrdersComponent_div_14_Template, 14, 5, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](5, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.userName, "'s orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true && ctx.orderArray.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.orderArray);
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_5__["LoaderComponent"]], styles: [".my-order-page[_ngcontent-%COMP%] {\r\n    min-height: 120vh;\r\n    padding-top: 80px;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    margin-bottom: 20px;\r\n    font-size: 18px;\r\n}\r\n\r\n.card-header[_ngcontent-%COMP%] {\r\n    background-color: rgb(0 255 167 / 46%);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXktb3JkZXJzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQkFBaUI7SUFDakIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxzQ0FBc0M7QUFDMUMiLCJmaWxlIjoiZGlzcGxheS1vcmRlcnMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5teS1vcmRlci1wYWdlIHtcclxuICAgIG1pbi1oZWlnaHQ6IDEyMHZoO1xyXG4gICAgcGFkZGluZy10b3A6IDgwcHg7XHJcbn1cclxuXHJcbmRpdiB7XHJcbiAgICBmb250LWZhbWlseTogXCJLYXJsYVwiLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG59XHJcblxyXG4uY2FyZC1oZWFkZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAgMjU1IDE2NyAvIDQ2JSk7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "6JSh":
/*!*****************************************************************!*\
  !*** ./src/app/global/desserts-icon/desserts-icon.component.ts ***!
  \*****************************************************************/
/*! exports provided: DessertsIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DessertsIconComponent", function() { return DessertsIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class DessertsIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
DessertsIconComponent.ɵfac = function DessertsIconComponent_Factory(t) { return new (t || DessertsIconComponent)(); };
DessertsIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DessertsIconComponent, selectors: [["app-desserts-icon"]], decls: 18, vars: 0, consts: [["id", "Capa_1", "enable-background", "new 0 0 512 512", "height", "35", "viewBox", "0 0 512 512", "width", "35", "xmlns", "http://www.w3.org/2000/svg"], ["d", "m199.424 291.494c-4.142 0-7.5 3.357-7.5 7.5v53.63c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-53.63c0-4.142-3.358-7.5-7.5-7.5z"], ["d", "m147.042 291.494c-4.142 0-7.5 3.357-7.5 7.5v53.63c0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-53.63c0-4.142-3.358-7.5-7.5-7.5z"], ["d", "m251.805 291.494c-4.142 0-7.5 3.357-7.5 7.5v53.63c0 4.143 3.358 7.5 7.5 7.5s7.499-3.357 7.499-7.5v-53.63c.001-4.142-3.357-7.5-7.499-7.5z"], ["d", "m304.186 360.124c4.143 0 7.5-3.357 7.5-7.5v-53.63c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v53.63c0 4.142 3.358 7.5 7.5 7.5z"], ["d", "m356.568 360.124c4.143 0 7.5-3.357 7.5-7.5v-53.63c0-4.143-3.357-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v53.63c0 4.142 3.357 7.5 7.5 7.5z"], ["d", "m177.7 185.583c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v.028c0 4.143 3.358 7.486 7.5 7.486s7.5-3.372 7.5-7.514z"], ["d", "m161.402 166.194c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v.028c0 4.143 3.358 7.486 7.5 7.486 4.142.001 7.5-3.371 7.5-7.514z"], ["d", "m145.075 185.583c0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5v.028c0 4.143 3.358 7.486 7.5 7.486s7.5-3.372 7.5-7.514z"], ["d", "m246.023 82.586c-4.142 0-7.5 3.357-7.5 7.5v.028c0 4.143 3.358 7.485 7.5 7.485s7.5-3.371 7.5-7.514c-.001-4.142-3.358-7.499-7.5-7.499z"], ["d", "m229.696 63.197c-4.142 0-7.5 3.357-7.5 7.5v.028c0 4.143 3.358 7.485 7.5 7.485s7.5-3.371 7.5-7.514c0-4.141-3.358-7.499-7.5-7.499z"], ["d", "m213.398 82.586c-4.142 0-7.5 3.357-7.5 7.5v.028c0 4.143 3.358 7.485 7.5 7.485s7.5-3.371 7.5-7.514c0-4.142-3.358-7.499-7.5-7.499z"], ["d", "m435.792 221.991h-12.366c.557-4.136.847-8.309.847-12.484 0-32.715-16.989-61.535-42.605-78.108l19.757-29.051c.017-.025.034-.049.051-.074l43.135-63.428c1.725-2.548 2.355-5.617 1.775-8.644-.581-3.034-2.308-5.655-4.844-7.372l-30.629-20.845c-2.547-1.724-5.617-2.354-8.643-1.775-3.034.581-5.655 2.308-7.375 4.848l-41.663 61.294c-.188.241-.358.495-.515.757l-11.714 17.233c-4.566-10.602-11.045-20.304-19.277-28.661-17.28-17.545-40.623-27.207-65.726-27.207-50.19 0-91.21 39.971-92.899 89.742-16.888 3.238-32.606 11.113-45.439 22.966-3.043 2.811-3.231 7.556-.42 10.599s7.556 3.231 10.598.421c14.422-13.322 33.19-20.658 52.848-20.658 42.971 0 77.932 34.973 77.932 77.963 0 4.236-.339 8.413-.994 12.484h-153.89c-.663-4.124-1.007-8.302-1.007-12.484 0-11.347 2.381-22.269 7.079-32.464 1.733-3.763.088-8.217-3.674-9.95-3.761-1.735-8.217-.089-9.95 3.673-5.61 12.177-8.455 25.212-8.455 38.741 0 4.176.29 8.349.847 12.484h-12.368c-9.34 0-16.939 7.599-16.939 16.938v19.502c0 6.646 3.856 12.393 9.439 15.166v56.379c0 38.381 31.224 69.605 69.604 69.605h89.298v45.094h-40.686c-18.546 0-33.634 15.101-33.634 33.663v22.053c0 6.402 5.195 11.61 11.581 11.61h173.839c6.402 0 11.61-5.208 11.61-11.61v-22.053c0-18.561-15.102-33.663-33.663-33.663h-40.686v-45.094h89.327c38.364 0 69.575-31.224 69.575-69.605v-54.606h.919c9.34 0 16.938-7.599 16.938-16.939v-19.502c0-9.34-7.598-16.938-16.938-16.938zm-30.434-205.644 14.162 9.639-22.318 2.361zm-19.203 28.25 39.225-4.149-11.681 17.176-39.227 4.161zm-22.733 33.445 39.221-4.161-11.691 17.191-39.202 4.142zm16.478 29.281-11.521 16.94c-6.219-2.715-12.79-4.768-19.625-6.071-.124-2.525-.334-5.031-.641-7.511zm29.373 102.183c0 4.181-.343 8.359-1.007 12.484h-135.483c.549-4.099.836-8.271.836-12.484 0-14.368-3.277-27.984-9.12-40.143 14.098-23.419 39.353-37.82 66.813-37.82 42.988.001 77.961 34.974 77.961 77.963zm-153.301-54.435c-16.901-23.325-44.349-38.527-75.284-38.527-.831 0-1.657.036-2.485.058 2.493-40.742 36.426-73.128 77.797-73.128 21.055 0 40.601 8.073 55.04 22.732 13.257 13.459 21.121 31.116 22.588 50.367-.77-.019-1.542-.029-2.316-.029-30.101 0-57.98 14.502-75.34 38.527zm79.349 323.266v18.663h-167.032v-18.663c0-10.291 8.359-18.663 18.634-18.663h129.734c10.292 0 18.664 8.372 18.664 18.663zm-74.349-33.663h-18.362v-45.094h18.362zm176.759-186.243c0 1.051-.888 1.939-1.938 1.939h-169.787c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5h153.867v54.605c0 30.109-24.482 54.605-54.575 54.605h-226.986c-30.109 0-54.604-24.496-54.604-54.605v-54.605h147.66c4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5h-155.16c-1.051 0-1.939-.889-1.939-1.939v-19.502c0-1.051.888-1.938 1.939-1.938h187.532c.011 0 .022.002.033.002.008 0 .015-.002.023-.002h171.997c1.051 0 1.938.888 1.938 1.938z"], ["d", "m323.381 185.583v.028c0 4.143 3.357 7.486 7.5 7.486s7.5-3.372 7.5-7.515-3.357-7.5-7.5-7.5-7.5 3.358-7.5 7.501z"], ["d", "m314.582 158.694c-4.143 0-7.5 3.357-7.5 7.5v.028c0 4.143 3.357 7.486 7.5 7.486s7.5-3.372 7.5-7.515c0-4.142-3.358-7.499-7.5-7.499z"], ["d", "m298.256 178.083c-4.143 0-7.5 3.357-7.5 7.5v.028c0 4.143 3.357 7.486 7.5 7.486s7.5-3.372 7.5-7.515c0-4.142-3.358-7.499-7.5-7.499z"]], template: function DessertsIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "path", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "path", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "path", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "path", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "path", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkZXNzZXJ0cy1pY29uLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "8YET":
/*!****************************************************************!*\
  !*** ./src/app/admin/manage-orders/manage-orders.component.ts ***!
  \****************************************************************/
/*! exports provided: ManageOrdersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageOrdersComponent", function() { return ManageOrdersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/user-data.service */ "DPk/");
/* harmony import */ var src_app_services_order_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/order-data.service */ "kS/D");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../global/loader/loader.component */ "yPJz");







function ManageOrdersComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-loader");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function ManageOrdersComponent_div_7_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h5", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Email:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Address:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "User ID:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ManageOrdersComponent_div_7_div_2_Template_div_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5); const user_r3 = ctx.$implicit; const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r4.goToOrders(user_r3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, " Orders ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](21, "i", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const user_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](user_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", user_r3.email, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", user_r3.address, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", user_r3.uid, "");
} }
function ManageOrdersComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ManageOrdersComponent_div_7_div_2_Template, 22, 4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.usersDataArray);
} }
class ManageOrdersComponent {
    constructor(userDataService, orderDataService, router) {
        this.userDataService = userDataService;
        this.orderDataService = orderDataService;
        this.router = router;
        this.usersDataArray = [];
        this.isLoading = false;
        this.isLoaded = false;
    }
    ngOnInit() {
        this.fetchAllUsersData();
    }
    fetchAllUsersData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isLoading = true;
            this.usersData = yield this.userDataService.getAllUsersData();
            this.formatUsersData();
            this.isLoading = false;
            this.isLoaded = true;
        });
    }
    formatUsersData() {
        for (let obj in this.usersData) {
            this.usersDataArray.push(this.usersData[obj]);
        }
    }
    goToOrders(user) {
        const navObj = {
            queryParams: { name: user.name }
        };
        this.router.navigate(['admin', user.uid, 'orders'], navObj);
    }
}
ManageOrdersComponent.ɵfac = function ManageOrdersComponent_Factory(t) { return new (t || ManageOrdersComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_2__["UserDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_order_data_service__WEBPACK_IMPORTED_MODULE_3__["OrderDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"])); };
ManageOrdersComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ManageOrdersComponent, selectors: [["app-manage-orders"]], decls: 8, vars: 2, consts: [[1, "manage-orders-page"], [1, "album", "py-5"], [1, "container"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], [4, "ngIf"], [1, "row", "row-cols-1", "row-cols-md-3", "g-4"], ["class", "col", 4, "ngFor", "ngForOf"], [1, "col"], [1, "card"], [1, "card-body"], [1, "card-title"], [1, "card-text"], [1, "card-footer", 3, "click"], [1, "fa", "fa-angle-right"]], template: function ManageOrdersComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Manage orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ManageOrdersComponent_div_6_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ManageOrdersComponent_div_7_Template, 3, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_6__["LoaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"]], styles: [".manage-orders-page[_ngcontent-%COMP%] {\r\n    min-height: 120vh;\r\n    padding-top: 80px;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%]:hover {\r\n    cursor: pointer;\r\n    background-color: rgb(46, 144, 255);\r\n    color: white;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hbmFnZS1vcmRlcnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsbUNBQW1DO0lBQ25DLFlBQVk7QUFDaEIiLCJmaWxlIjoibWFuYWdlLW9yZGVycy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1hbmFnZS1vcmRlcnMtcGFnZSB7XHJcbiAgICBtaW4taGVpZ2h0OiAxMjB2aDtcclxuICAgIHBhZGRpbmctdG9wOiA4MHB4O1xyXG59XHJcblxyXG5kaXYge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiS2FybGFcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLmNhcmQtZm9vdGVyOmhvdmVyIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig0NiwgMTQ0LCAyNTUpO1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59Il19 */"] });


/***/ }),

/***/ "9vUh":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _categories_categories_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./categories/categories.component */ "UvY/");
/* harmony import */ var _header_image_header_image_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header-image/header-image.component */ "Xc5M");



class HomeComponent {
    constructor() { }
    ngOnInit() {
    }
}
HomeComponent.ɵfac = function HomeComponent_Factory(t) { return new (t || HomeComponent)(); };
HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HomeComponent, selectors: [["app-home"]], decls: 15, vars: 0, consts: [[1, "pt-5", "my-5", "px-xs-0", "px-sm-0", "pt-xs-0", "pt-sm-0", "text-center"], [1, "overflow-hidden"], [1, "container"], ["src", "https://firebasestorage.googleapis.com/v0/b/restaurant-21-club.appspot.com/o/interior2.jpg?alt=media&token=742de6e1-bbe5-45ee-ad1a-4fc074e5795e", "alt", "Example image", "loading", "lazy", 1, "border", "mb-4", 2, "width", "100%", "margin-top", "20px"], [1, "px-4", "py-5", "my-5", "text-center"], [1, "col-lg-6", "mx-auto"], [1, "lead", "mb-4"], [2, "margin-top", "25px"]], template: function HomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Whether you are planning an intimate dinner for friends, a corporate luncheon, or an extravagant soir\u00E9e, you will find the perfect setting at 21 Club. In addition to accommodating as many as 400 guests, our restaurant feature award-winning off-site catering and a full service event production team that will make sure every detail is in place, so you don\u2019t have to. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-categories");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "app-header-image");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "p", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " With specialty cocktails, unique starter dishes, and spectacular main courses and desserts, 21 Club is an amazing eatery. The superb talent and exacting precision of our chefs and staffs will make your experience here a grandeur one. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_categories_categories_component__WEBPACK_IMPORTED_MODULE_1__["CategoriesComponent"], _header_image_header_image_component__WEBPACK_IMPORTED_MODULE_2__["HeaderImageComponent"]], styles: [".lead[_ngcontent-%COMP%] {\r\n    color: black;\r\n    font-weight: 400;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 1281px) {\r\n    .lead[_ngcontent-%COMP%] {\r\n        font-size: 25px;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 1025px) and (max-width: 1280px) {\r\n    .lead[_ngcontent-%COMP%] {\r\n        font-size: 25px;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) {}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    .lead[_ngcontent-%COMP%] {\r\n        font-size: 18px;\r\n    }\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    .lead[_ngcontent-%COMP%] {\r\n        font-size: 18px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7SUFDWixnQkFBZ0I7QUFDcEI7OztBQUdBOzs7Q0FHQzs7O0FBRUQ7SUFDSTtRQUNJLGVBQWU7SUFDbkI7QUFDSjs7O0FBR0E7OztHQUdHOzs7QUFFSDtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtBQUNKOzs7QUFHQTs7O0dBR0c7OztBQUVILG1EQUFtRDs7O0FBR25EOzs7R0FHRzs7O0FBRUgsZ0ZBQWdGOzs7QUFHaEY7OztHQUdHOzs7QUFFSDtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtBQUNKOzs7QUFHQTs7O0dBR0c7OztBQUVIO0lBQ0k7UUFDSSxlQUFlO0lBQ25CO0FBQ0oiLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxlYWQge1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICMjRGV2aWNlID0gRGVza3RvcHNcclxuICAjI1NjcmVlbiA9IDEyODFweCB0byBoaWdoZXIgcmVzb2x1dGlvbiBkZXNrdG9wc1xyXG4qL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDEyODFweCkge1xyXG4gICAgLmxlYWQge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjVweDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBMYXB0b3BzLCBEZXNrdG9wc1xyXG4gICAgIyNTY3JlZW4gPSBCL3cgMTAyNXB4IHRvIDEyODBweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNXB4KSBhbmQgKG1heC13aWR0aDogMTI4MHB4KSB7XHJcbiAgICAubGVhZCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAyNXB4O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IFRhYmxldHMsIElwYWRzIChwb3J0cmFpdClcclxuICAgICMjU2NyZWVuID0gQi93IDc2OHB4IHRvIDEwMjRweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIHt9XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IFRhYmxldHMsIElwYWRzIChsYW5kc2NhcGUpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA3NjhweCB0byAxMDI0cHhcclxuICAqL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHt9XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IExvdyBSZXNvbHV0aW9uIFRhYmxldHMsIE1vYmlsZXMgKExhbmRzY2FwZSlcclxuICAgICMjU2NyZWVuID0gQi93IDQ4MXB4IHRvIDc2N3B4XHJcbiAgKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAubGVhZCB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IE1vc3Qgb2YgdGhlIFNtYXJ0cGhvbmVzIE1vYmlsZXMgKFBvcnRyYWl0KVxyXG4gICAgIyNTY3JlZW4gPSBCL3cgMzIwcHggdG8gNDc5cHhcclxuICAqL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDMyMHB4KSBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAgIC5sZWFkIHtcclxuICAgICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBQq6pRpxgDOYsNo3PdNnfI-hiD5g-SBFk",
        authDomain: "restaurant-21-club.firebaseapp.com",
        databaseURL: "https://restaurant-21-club-default-rtdb.firebaseio.com",
        projectId: "restaurant-21-club",
        storageBucket: "restaurant-21-club.appspot.com",
        messagingSenderId: "440699115978",
        appId: "1:440699115978:web:a26f415abe1f71fc171733",
        measurementId: "G-1DCVC2NW3E"
    },
    UNSPLASH_SOURCE_API: 'https://source.unsplash.com/1280x900/?restaurants,food,alcohol',
};


/***/ }),

/***/ "DPk/":
/*!***********************************************!*\
  !*** ./src/app/services/user-data.service.ts ***!
  \***********************************************/
/*! exports provided: UserDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserDataService", function() { return UserDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _handle_local_storage_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./handle-local-storage.service */ "Dm4p");







class UserDataService {
    constructor(afdb, http, handleLocalStorageService) {
        this.afdb = afdb;
        this.http = http;
        this.handleLocalStorageService = handleLocalStorageService;
        this.userData = {
            uid: null,
            email: null,
            name: null,
            phone: null,
            address: null,
            role: {
                val: 'customer',
            },
        };
        this.userDataSub = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](this.userData);
        this.isAdminSub = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
    }
    /** saves new user data in Firebase DB */
    createNewUser(name, email, uid) {
        this.userData.name = name;
        this.userData.email = email;
        this.userData.uid = uid;
        this.userObj = this.afdb.object('users/' + this.userData.uid);
        this.userObj.set(this.userData).then(() => {
            this.getUserDataFromFirebase();
        });
        this.userDataSub.next(this.userData);
    }
    getUserDataObservable() {
        return this.userDataSub.asObservable();
    }
    // --- replace this with an async method
    getUserDataFromFirebase() {
        if (this.handleLocalStorageService.getUser() != null) {
            //console.log('getting user data from firebase');
            this.http
                .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL +
                '/users/' +
                localStorage.getItem('user') +
                '.json')
                .subscribe((data) => {
                this.userData = data;
                this.userDataSub.next(this.userData);
                this.handleLocalStorageService.setUserName(this.userData.name);
                // set isAdmin value
                if (data.role.val == 'admin') {
                    this.handleLocalStorageService.setIsAdmin('true');
                    this.isAdminSub.next(true);
                }
                else if (data.role.val == 'customer') {
                    this.isAdminSub.next(false);
                    this.handleLocalStorageService.setIsAdmin('false');
                }
            });
        }
    }
    getIsAdminObservable() {
        this.isAdminSub.next(this.userData.role.val == 'true' ? true : false);
        return this.isAdminSub.asObservable();
    }
    updateUserData(userDataParam) {
        this.handleLocalStorageService.setUserName(userDataParam.name);
        this.userDataSub.next(userDataParam);
        this.userObj = this.afdb.object('users/' + userDataParam.uid);
        return this.userObj.update(userDataParam);
    }
    checkAddressPresentOrNot() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.handleLocalStorageService.getUser() != null) {
                return yield this.getAddressFromFirebase();
            }
        });
    }
    getAddressFromFirebase() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return yield this.http
                .get(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL +
                '/users/' +
                localStorage.getItem('user') +
                '/address' +
                '.json')
                .toPromise();
        });
    }
    getAllUsersData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL + '/users.json';
            return yield this.http.get(path).toPromise();
        });
    }
    clearUserDataLocally() {
        Object.entries(this.userData).forEach(([key, val]) => {
            if (key === 'role') {
                this.userData.role.val = 'customer';
            }
            else {
                this.userData[key] = null;
            }
        });
    }
    set setUid(v) {
        this.userData.uid = v;
    }
    get getUid() {
        return this.userData.uid;
    }
    set setEmail(v) {
        this.userData.email = v;
    }
    set setName(v) {
        this.userData.name = v;
    }
    get getName() {
        return this.userData.name;
    }
    set setPhone(v) {
        this.userData.phone = v;
    }
    set setAddress(v) {
        this.userData.address = v;
    }
}
UserDataService.ɵfac = function UserDataService_Factory(t) { return new (t || UserDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_4__["AngularFireDatabase"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_6__["HandleLocalStorageService"])); };
UserDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: UserDataService, factory: UserDataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "Dm4p":
/*!**********************************************************!*\
  !*** ./src/app/services/handle-local-storage.service.ts ***!
  \**********************************************************/
/*! exports provided: HandleLocalStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandleLocalStorageService", function() { return HandleLocalStorageService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class HandleLocalStorageService {
    constructor() {
        this.cartDataSub = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](null);
    }
    setUser(value) {
        localStorage.setItem('user', value);
    }
    getUser() {
        return localStorage.getItem('user');
    }
    setIsAuthenticated(value) {
        localStorage.setItem('isAuthenticated', value);
    }
    getIsAuthenticated() {
        return localStorage.getItem('isAuthenticated');
    }
    setIsAdmin(value) {
        localStorage.setItem('isAdmin', value);
    }
    getIsAdmin() {
        return localStorage.getItem('isAdmin');
    }
    setUserName(value) {
        localStorage.setItem('name', value);
    }
    getUserName() {
        return localStorage.getItem('name');
    }
    clearDataOnLogOut() {
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('name');
    }
    // cart data
    addCartData(cart) {
        localStorage.setItem('cartData', JSON.stringify(cart));
        const obj = JSON.parse(localStorage.getItem('cartData'));
        // check if items in cart is empty
        if (Object.keys(obj.items).length == 0) {
            this.removeCartData();
        }
        this.cartDataSub.next(JSON.parse(this.getCartData()));
    }
    removeCartData() {
        if (localStorage.getItem('cartData') != null) {
            localStorage.removeItem('cartData');
        }
        this.cartDataSub.next(null);
    }
    getCartData() {
        return localStorage.getItem('cartData');
    }
    getCartDataObservable() {
        this.cartDataSub.next(JSON.parse(this.getCartData()));
        return this.cartDataSub.asObservable();
    }
}
HandleLocalStorageService.ɵfac = function HandleLocalStorageService_Factory(t) { return new (t || HandleLocalStorageService)(); };
HandleLocalStorageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HandleLocalStorageService, factory: HandleLocalStorageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "HNvH":
/*!***************************************************!*\
  !*** ./src/app/global/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 25, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col-md-6", "footer-column"], [2, "margin-top", "60px"], [1, "text-center", 2, "margin-top", "60px"], [1, "icon", "ion-heart"], ["href", "https://www.thecoducer.com/", "target", "_blank"], ["href", "https://github.com/thecoducer/restaurant-order-management-system", "target", "_blank"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Location");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "23, Ballygunge Place, Ballygunge, Kolkata, West Bengal 700019");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Contact");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "+91-896-963-9647");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "hr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, " Made with ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " by ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "The Coducer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "View code on ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Github");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["footer[_ngcontent-%COMP%] {\r\n    padding: 2rem 0;\r\n    background-color: #003265;\r\n    color: white;\r\n    padding-top: 50px;\r\n    padding-bottom: 50px;\r\n}\r\n\r\na[_ngcontent-%COMP%]:hover {\r\n    color: white;\r\n}\r\n\r\na[_ngcontent-%COMP%] {\r\n    color: white;\r\n}\r\n\r\n.footer-column[_ngcontent-%COMP%] {\r\n    text-align: center;\r\n}\r\n\r\n.footer-column.nav-item.nav-link[_ngcontent-%COMP%] {\r\n    padding: 0.1rem 0;\r\n}\r\n\r\n.footer-column.nav-itemspan.nav-link[_ngcontent-%COMP%] {\r\n    color: #6c757d;\r\n}\r\n\r\n.footer-column.nav-itemspan.footer-title[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    font-weight: 700;\r\n    color: #fff;\r\n    text-transform: uppercase;\r\n}\r\n\r\n.footer-column.nav-item.fas[_ngcontent-%COMP%] {\r\n    margin-right: 0.5rem;\r\n}\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    .footer-column[_ngcontent-%COMP%] {\r\n        margin-top: 30px;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    .footer-column[_ngcontent-%COMP%] {\r\n        margin-top: 30px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZUFBZTtJQUNmLHlCQUF5QjtJQUN6QixZQUFZO0lBQ1osaUJBQWlCO0lBQ2pCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsV0FBVztJQUNYLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFHQTs7O0dBR0c7O0FBRUg7SUFDSTtRQUNJLGdCQUFnQjtJQUNwQjtBQUNKOztBQUdBOzs7R0FHRzs7QUFFSDtJQUNJO1FBQ0ksZ0JBQWdCO0lBQ3BCO0FBQ0oiLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJmb290ZXIge1xyXG4gICAgcGFkZGluZzogMnJlbSAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMzI2NTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHBhZGRpbmctdG9wOiA1MHB4O1xyXG4gICAgcGFkZGluZy1ib3R0b206IDUwcHg7XHJcbn1cclxuXHJcbmE6aG92ZXIge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG5hIHtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLmZvb3Rlci1jb2x1bW4ge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbHVtbi5uYXYtaXRlbS5uYXYtbGluayB7XHJcbiAgICBwYWRkaW5nOiAwLjFyZW0gMDtcclxufVxyXG5cclxuLmZvb3Rlci1jb2x1bW4ubmF2LWl0ZW1zcGFuLm5hdi1saW5rIHtcclxuICAgIGNvbG9yOiAjNmM3NTdkO1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbHVtbi5uYXYtaXRlbXNwYW4uZm9vdGVyLXRpdGxlIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbn1cclxuXHJcbi5mb290ZXItY29sdW1uLm5hdi1pdGVtLmZhcyB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBMb3cgUmVzb2x1dGlvbiBUYWJsZXRzLCBNb2JpbGVzIChMYW5kc2NhcGUpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA0ODFweCB0byA3NjdweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNDgxcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgLmZvb3Rlci1jb2x1bW4ge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICAgICMjRGV2aWNlID0gTW9zdCBvZiB0aGUgU21hcnRwaG9uZXMgTW9iaWxlcyAoUG9ydHJhaXQpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyAzMjBweCB0byA0NzlweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gICAgLmZvb3Rlci1jb2x1bW4ge1xyXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ "J0Of":
/*!************************************************************************!*\
  !*** ./src/app/admin/add-or-edit-items/add-or-edit-items.component.ts ***!
  \************************************************************************/
/*! exports provided: AddOrEditItemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddOrEditItemsComponent", function() { return AddOrEditItemsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_item_image_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/item-image.service */ "0Gxy");
/* harmony import */ var src_app_services_item_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/item-data.service */ "vQsw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function AddOrEditItemsComponent_span_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Please enter a title for this item.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_span_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Please enter a valid amount.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_span_40_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Please select a category.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_div_44_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddOrEditItemsComponent_div_44_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r17.onDeleteImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Delete image");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_div_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, AddOrEditItemsComponent_div_44_button_4_Template, 2, 0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r3.previewPath, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.showDeleteBtn == true && ctx_r3.previewPath != "");
} }
function AddOrEditItemsComponent_input_45_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "input", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function AddOrEditItemsComponent_input_45_Template_input_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r19.selectFile($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_span_46_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Please set and upload an image for this item.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
const _c0 = function (a0) { return { width: a0 }; };
function AddOrEditItemsComponent_div_47_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](3, _c0, ctx_r6.uploadPercentage + "%"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-valuenow", ctx_r6.uploadPercentage);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r6.uploadPercentage, "% ");
} }
function AddOrEditItemsComponent_div_48_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please select an .jpg, .jpeg or .png file only. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_div_49_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please upload an image smaller than 2 MB. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_div_50_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r9.onSuccessText, " ");
} }
function AddOrEditItemsComponent_div_51_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Some error occurred.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r10.unknownErrorText, " ");
} }
function AddOrEditItemsComponent_button_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx_r11.addOrEditItemsForm.valid || ctx_r11.isUploading || ctx_r11.fileSizeExceeded || !ctx_r11.isImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r11.submitBtnText);
} }
function AddOrEditItemsComponent_button_54_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r12.isUploading || ctx_r12.fileSizeExceeded || !ctx_r12.isImage);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r12.submitBtnText);
} }
function AddOrEditItemsComponent_button_55_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddOrEditItemsComponent_button_55_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r21.onDeleteItem(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Delete item");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_button_56_Template(rf, ctx) { if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddOrEditItemsComponent_button_56_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r24); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](); return ctx_r23.addAnotherItem(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r14.addAnotherItemBtnText);
} }
function AddOrEditItemsComponent_div_57_button_6_Template(rf, ctx) { if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddOrEditItemsComponent_div_57_button_6_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r27); const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2); return ctx_r26.onDeleteImage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Delete image");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function AddOrEditItemsComponent_div_57_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, AddOrEditItemsComponent_div_57_button_6_Template, 2, 0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r15.previewPath, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r15.showDeleteBtn == true && ctx_r15.previewPath != "");
} }
const _c1 = function () { return ["/admin/items"]; };
class AddOrEditItemsComponent {
    constructor(router, route, itemImageService, itemDataService) {
        this.router = router;
        this.route = route;
        this.itemImageService = itemImageService;
        this.itemDataService = itemDataService;
        this.selectedFile = null;
        this.uploadPercentage = -1;
        this.isAdd = false;
        this.isEdit = false;
        this.isUploaded = false;
        this.isUploading = false;
        this.isImage = false;
        this.isSubmitted = false;
        this.fileSizeExceeded = false;
        this.showDeleteBtn = false;
        this.onSuccessText = '';
        this.unknownErrorText = '';
        this.previewPath = '';
        this.validImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        this.item = {
            id: '',
            name: '',
            description: '',
            price: 0,
            category: '',
            imageUrl: '',
            addedOn: '',
            modifiedOn: '',
            isAvailable: true
        };
        //
        this.isAdd = false;
        this.isEdit = false;
        this.isUploaded = false;
        this.isUploading = false;
        this.isImage = false;
        this.isSubmitted = false;
        this.fileSizeExceeded = false;
        this.showDeleteBtn = false;
        this.selectedFile = null;
        //
    }
    ngOnInit() {
        // creating reactive signup form
        this.addOrEditItemsForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            itemTitle: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            itemDesc: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
            itemPrice: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern('^-?[0-9]+([,.]?[0-9]+)?$'),
            ]),
            itemCategory: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]),
            itemImage: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](''),
        });
        // get data from route
        this.route.data.subscribe((data) => {
            this.selectedPath = data['path'];
            this.submitBtnText =
                this.selectedPath === 'edit' ? 'Update item' : 'Add item';
            this.isAdd = this.selectedPath === 'add' ? true : false;
            this.isEdit = this.selectedPath === 'edit' ? true : false;
        });
        // get value of path variables from route
        this.route.params.subscribe((value) => {
            this.itemId = value['itemId'];
            this.itemCategory = value['itemCategory'];
        });
        // if it is edit
        if (this.isEdit == true) {
            this.initializeForItemEdit();
        }
    }
    initializeForItemEdit() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.item = (yield this.itemDataService.getItemById(this.itemCategory, this.itemId));
            this.addOrEditItemsForm.patchValue({
                itemTitle: this.replaceUndefinedOrNull(this.item.name),
                itemDesc: this.replaceUndefinedOrNull(this.item.description),
                itemPrice: this.replaceUndefinedOrNull(this.item.price),
                itemCategory: this.replaceUndefinedOrNull(this.item.category),
            });
            this.previewPath = this.item.imageUrl;
            this.imageUrl = this.item.imageUrl;
            this.fileSizeExceeded = false;
            this.isImage = true;
            this.showDeleteBtn = true;
        });
    }
    // on selecting a file
    selectFile(event) {
        this.setFile(event);
        this.checkImageOrNot(this.file);
        if (this.isImage) {
            this.checkFileSize(this.file);
        }
        if (this.isImage == true && this.fileSizeExceeded == false) {
            this.previewImage();
        }
    }
    // on clicking submit
    onSubmit() {
        // handle the case when disabled attribute for add item button is deleted
        // from html
        if (this.isAdd) {
            if (this.addOrEditItemsForm.invalid == true ||
                this.isImage == false ||
                this.fileSizeExceeded == true) {
                return;
            }
        }
        // call to uploadImage() uploads the selected image and fetches the image URL
        // and then it pushes the item data to Firebase DB
        if (this.isAdd == true && this.selectedFile != null) {
            this.uploadImage();
        }
        // if a new image file is selected on edit page
        // we delete the previous image
        // and upload the new image
        // and update the item data
        if (this.selectedFile != null &&
            this.isEdit == true &&
            this.item.imageUrl == '') {
            this.uploadImage();
        }
        else if (this.selectedFile != null &&
            this.isEdit == true &&
            this.item.imageUrl != '') {
            this.performDeleteImage();
            this.uploadImage();
        }
        else if (this.selectedFile == null && this.isEdit) {
            this.updateItemData();
        }
    }
    uploadImage() {
        const category = this.addOrEditItemsForm.get('itemCategory').value;
        this.isUploading = true;
        this.itemImageService.pushImageToStorage(this.file, category).subscribe((percentage) => {
            this.uploadPercentage = Math.round(percentage ? percentage : 0);
            if (this.uploadPercentage == 100) {
                this.isUploaded = true;
            }
        }, (error) => {
            this.unknownErrorText = error;
            this.isUploaded = false;
            this.isUploading = false;
        });
        // get the image url from Firebase
        // then push item data to Firebase Realtime DB
        this.imageUrlSub = this.itemImageService
            .getimageUrlObservable()
            .subscribe((url) => {
            if (url != '' && url != null && url != undefined) {
                this.imageUrl = url;
                // unsubscribe here so that pushItemData() isn't called more than once
                this.imageUrlSub.unsubscribe();
                if (this.isAdd) {
                    this.pushItemData();
                }
                else if (this.isEdit) {
                    this.updateItemData();
                }
            }
        });
    }
    // saves item data in Firebase DB
    pushItemData() {
        this.item.name = this.addOrEditItemsForm.get('itemTitle').value;
        this.item.description = this.addOrEditItemsForm.get('itemDesc').value;
        this.item.price = this.addOrEditItemsForm.get('itemPrice').value;
        this.item.category = this.addOrEditItemsForm.get('itemCategory').value;
        this.item.imageUrl = this.imageUrl;
        this.item.addedOn = new Date().toLocaleString();
        this.itemDataService.addItemData(this.item).subscribe((response) => {
            if (response != null) {
                this.isSubmitted = true;
                this.onSuccessText = 'Item added!';
                this.addAnotherItemBtnText = 'Add another item';
                // Firebase returns an unique identifier on adding some data via POST request
                // We fetch it from response.name
                this.itemDataService.setItemId(response.name);
            }
        }, (error) => {
            this.unknownErrorText = error;
            this.isSubmitted = false;
            this.addAnotherItemBtnText = 'Try again?';
        });
    }
    // updates item data
    updateItemData() {
        this.item.name = this.addOrEditItemsForm.get('itemTitle').value;
        this.item.description = this.addOrEditItemsForm.get('itemDesc').value;
        this.item.price = this.addOrEditItemsForm.get('itemPrice').value;
        this.item.category = this.addOrEditItemsForm.get('itemCategory').value;
        this.item.imageUrl = this.imageUrl;
        this.item.modifiedOn = new Date().toLocaleString();
        this.performItemDataUpdate(this.item)
            .then((res) => {
            this.isSubmitted = true;
            this.onSuccessText = 'Item updated!';
        })
            .catch((error) => {
            this.unknownErrorText = error;
            this.isSubmitted = false;
        });
    }
    performItemDataUpdate(item) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.itemDataService.updateItemData(item, this.itemCategory, this.itemId);
        });
    }
    addAnotherItem() {
        this.addOrEditItemsForm.reset();
        this.file = null;
        this.selectedFile = null;
        this.uploadPercentage = -1;
        this.isImage = false;
        this.isUploaded = false;
        this.isUploading = false;
        this.isSubmitted = false;
        this.fileSizeExceeded = false;
        if (this.isAdd) {
            this.submitBtnText = 'Add item';
        }
        if (this.isEdit) {
            this.submitBtnText = 'Update item';
        }
        this.unknownErrorText = '';
        this.previewPath = '';
        this.onSuccessText = '';
        this.item = {
            id: '',
            name: '',
            description: '',
            price: 0,
            category: '',
            imageUrl: '',
            addedOn: '',
            modifiedOn: '',
            isAvailable: true
        };
    }
    onDeleteImage() {
        if (this.isEdit != true && this.showDeleteBtn != true) {
            return;
        }
        this.performDeleteImage();
    }
    performDeleteImage() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            yield this.itemImageService
                .deleteImage(this.item.imageUrl)
                .then(() => {
                // only when no image file selected
                // hide image preview
                if (this.selectedFile == null) {
                    this.previewPath = '';
                    this.showDeleteBtn = false;
                    this.item.imageUrl = '';
                }
            })
                .catch(() => {
                this.unknownErrorText = 'Some error occurred while deleting image.';
            });
            yield this.itemDataService.deleteImageUrl(this.item.category, this.itemId);
        });
    }
    onDeleteItem() {
        if (this.isEdit != true && this.showDeleteBtn != true) {
            return;
        }
        this.performDeleteItem();
    }
    performDeleteItem() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // first delete the thumbnail image and then delete the item data
            if (this.previewPath != '') {
                yield this.performDeleteImage();
            }
            yield this.itemDataService
                .deleteItemData(this.item.category, this.item.id)
                .then(() => {
                this.onSuccessText = 'Item deleted!';
                setTimeout(() => {
                    this.router.navigate(['admin/items']);
                }, 1500);
            })
                .catch(() => {
                this.unknownErrorText = 'Some error occurred while deleting item.';
            });
        });
    }
    /**
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
    /** Utility functions */
    setFile(event) {
        this.selectedFile = event.target.files;
        if (this.selectedFile) {
            this.file = this.selectedFile.item(0);
        }
    }
    // preview the selected image
    // uses FileReader and reads the selected file
    previewImage() {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.previewPath = fileReader.result;
        };
        fileReader.readAsDataURL(this.file);
    }
    checkImageOrNot(file) {
        if (this.validImageTypes.indexOf(file.type) != -1) {
            this.isImage = true;
        }
        else {
            this.isImage = false;
        }
    }
    checkFileSize(file) {
        const limit = 2048;
        if (Math.round(file.size / 1024) > limit) {
            this.fileSizeExceeded = true;
        }
        else {
            this.fileSizeExceeded = false;
        }
    }
    hideResponseTexts() {
        this.unknownErrorText = '';
        this.onSuccessText = '';
    }
    replaceUndefinedOrNull(v) {
        if (v == undefined || v == null) {
            return '';
        }
        return v;
    }
}
AddOrEditItemsComponent.ɵfac = function AddOrEditItemsComponent_Factory(t) { return new (t || AddOrEditItemsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_item_image_service__WEBPACK_IMPORTED_MODULE_4__["ItemImageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_services_item_data_service__WEBPACK_IMPORTED_MODULE_5__["ItemDataService"])); };
AddOrEditItemsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AddOrEditItemsComponent, selectors: [["app-add-or-edit-items"]], decls: 58, vars: 22, consts: [[1, "container", "add-edit-div"], [1, "row"], [1, "d-flex", "flex-row-reverse", 2, "margin-bottom", "30px"], [1, "p-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "routerLink"], [1, "fa", "fa-arrow-left"], [2, "margin-left", "3px", "margin-bottom", "10px"], [1, "col-xs-12", "col-md-6", "col-md-offset-3"], [2, "margin-bottom", "40px"], [3, "formGroup", "ngSubmit"], [3, "click"], [1, "form-group"], ["for", "exampleInputEmail1"], ["type", "itemTitle", "formControlName", "itemTitle", 1, "form-control"], ["class", "error-text", 4, "ngIf"], ["type", "itemDesc", "formControlName", "itemDesc", 1, "form-control"], ["type", "itemPrice", "formControlName", "itemPrice", 1, "form-control"], ["aria-label", "Default select example", "formControlName", "itemCategory", 1, "form-select"], ["value", "starters"], ["value", "mains"], ["value", "alcoholic-beverages"], ["value", "desserts"], ["class", "form-group mobile-only", "style", "margin-top: 15px;", 4, "ngIf"], ["type", "file", "class", "form-control text-nowrap text-truncate", "accept", "image/png, image/jpeg, image/jpg", "formControlName", "itemImage", 3, "change", 4, "ngIf"], ["class", "progress mt-2", "style", "margin-bottom: 15px;", 4, "ngIf"], ["class", "alert alert-danger", "role", "alert", 4, "ngIf"], ["class", "alert alert-success", "role", "alert", 4, "ngIf"], ["type", "submit", "style", "margin-right: 10px", "class", "btn btn-md btn-primary", 3, "disabled", 4, "ngIf"], ["type", "submit", "class", "btn btn-md btn-primary", 3, "disabled", 4, "ngIf"], ["type", "button", "class", "btn btn-md btn-outline-danger", "style", "margin-left: 10px", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-md btn-primary", 3, "click", 4, "ngIf"], ["class", "col-xs-12 col-md-6 col-md-offset-3 on-mobile-hide", 4, "ngIf"], [1, "error-text"], [1, "form-group", "mobile-only", 2, "margin-top", "15px"], [1, "container-fluid", "no-padding"], ["alt", "", 1, "img-thumbnail", 3, "src"], [1, "text-center"], ["type", "button", "class", "btn btn-md btn-outline-danger", "style", "margin-top: 25px", 3, "click", 4, "ngIf"], ["type", "button", 1, "btn", "btn-md", "btn-outline-danger", 2, "margin-top", "25px", 3, "click"], ["type", "file", "accept", "image/png, image/jpeg, image/jpg", "formControlName", "itemImage", 1, "form-control", "text-nowrap", "text-truncate", 3, "change"], [1, "progress", "mt-2", 2, "margin-bottom", "15px"], ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", 1, "progress-bar", "progress-bar-animated", "bg-warning", 3, "ngStyle"], ["role", "alert", 1, "alert", "alert-danger"], ["role", "alert", 1, "alert", "alert-success"], ["type", "submit", 1, "btn", "btn-md", "btn-primary", 2, "margin-right", "10px", 3, "disabled"], ["type", "submit", 1, "btn", "btn-md", "btn-primary", 3, "disabled"], ["type", "button", 1, "btn", "btn-md", "btn-outline-danger", 2, "margin-left", "10px", 3, "click"], ["type", "button", 1, "btn", "btn-md", "btn-primary", 3, "click"], [1, "col-xs-12", "col-md-6", "col-md-offset-3", "on-mobile-hide"], [1, "col-md-12"]], template: function AddOrEditItemsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "i", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Display all items ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "h2", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "titlecase");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "form", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function AddOrEditItemsComponent_Template_form_ngSubmit_12_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AddOrEditItemsComponent_Template_div_click_13_listener() { return ctx.hideResponseTexts(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, AddOrEditItemsComponent_span_18_Template, 2, 0, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](21, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Price (in \u20B9)");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](27, AddOrEditItemsComponent_span_27_Template, 2, 0, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](28, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "Category");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "select", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "option", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33, "Starters");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "option", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, "Mains");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "option", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "Alcoholic Beverages");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "option", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, "Desserts");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, AddOrEditItemsComponent_span_40_Template, 2, 0, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](43, "Thumbnail image");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](44, AddOrEditItemsComponent_div_44_Template, 5, 2, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](45, AddOrEditItemsComponent_input_45_Template, 1, 0, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](46, AddOrEditItemsComponent_span_46_Template, 2, 0, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](47, AddOrEditItemsComponent_div_47_Template, 3, 5, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](48, AddOrEditItemsComponent_div_48_Template, 2, 0, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](49, AddOrEditItemsComponent_div_49_Template, 2, 0, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](50, AddOrEditItemsComponent_div_50_Template, 2, 1, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](51, AddOrEditItemsComponent_div_51_Template, 4, 1, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](52, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](53, AddOrEditItemsComponent_button_53_Template, 2, 2, "button", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](54, AddOrEditItemsComponent_button_54_Template, 2, 2, "button", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](55, AddOrEditItemsComponent_button_55_Template, 2, 0, "button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](56, AddOrEditItemsComponent_button_56_Template, 2, 1, "button", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](57, AddOrEditItemsComponent_div_57_Template, 7, 2, "div", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](21, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 19, ctx.selectedPath), " Item");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.addOrEditItemsForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.addOrEditItemsForm.controls.itemTitle.errors != null && ctx.addOrEditItemsForm.controls.itemTitle.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.addOrEditItemsForm.controls.itemPrice.errors != null && ctx.addOrEditItemsForm.controls.itemPrice.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.addOrEditItemsForm.controls.itemCategory.errors != null && ctx.addOrEditItemsForm.controls.itemCategory.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.previewPath != "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isUploaded);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.addOrEditItemsForm.controls.itemImage.errors != null && ctx.addOrEditItemsForm.controls.itemImage.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isUploading);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedFile && !ctx.isImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.selectedFile && ctx.isImage && ctx.fileSizeExceeded);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.onSuccessText != "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.unknownErrorText != "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isAdd == true && ctx.isUploading == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isEdit == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.showDeleteBtn == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isSubmitted == true && ctx.isAdd == true || ctx.unknownErrorText != "" && ctx.isAdd == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.previewPath != "");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLink"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_z"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgStyle"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["TitleCasePipe"]], styles: [".add-edit-div[_ngcontent-%COMP%] {\r\n    padding-top: 70px;\r\n    padding-bottom: 180px;\r\n    min-height: 70vh;\r\n}\r\n\r\n.form-group[_ngcontent-%COMP%] {\r\n    margin-bottom: 20px;\r\n}\r\n\r\nlabel[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n    font-weight: 400;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZC1vci1lZGl0LWl0ZW1zLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQkFBaUI7SUFDakIscUJBQXFCO0lBQ3JCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixnQkFBZ0I7QUFDcEIiLCJmaWxlIjoiYWRkLW9yLWVkaXQtaXRlbXMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hZGQtZWRpdC1kaXYge1xyXG4gICAgcGFkZGluZy10b3A6IDcwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTgwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiA3MHZoO1xyXG59XHJcblxyXG4uZm9ybS1ncm91cCB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG5sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG59Il19 */"] });


/***/ }),

/***/ "LCe4":
/*!*********************************************************!*\
  !*** ./src/app/global/cart-icon/cart-icon.component.ts ***!
  \*********************************************************/
/*! exports provided: CartIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartIconComponent", function() { return CartIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class CartIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
CartIconComponent.ɵfac = function CartIconComponent_Factory(t) { return new (t || CartIconComponent)(); };
CartIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CartIconComponent, selectors: [["app-cart-icon"]], decls: 25, vars: 0, consts: [["height", "28", "width", "28", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 512 512", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 512 512"], ["d", "M394.667,256C318.122,255.906,256.094,193.878,256,117.333c0-3.605,0.277-7.125,0.533-10.667H96\n\tc-5.891,0.005-10.662,4.785-10.657,10.677c0.001,0.655,0.062,1.309,0.182,1.953l32,170.667c0.944,5.043,5.344,8.699,10.475,8.704\n\th292.992c26.9,0.003,49.592-20.027,52.928-46.72l2.901-23.168C453.072,246.443,424.265,255.988,394.667,256z", 2, "fill", "#FFC107"], ["cx", "394.667", "cy", "458.667", "r", "53.333", 2, "fill", "#455A64"], ["cx", "181.333", "cy", "458.667", "r", "53.333", 2, "fill", "#455A64"], ["d", "M437.333,384H191.125c-35.561-0.074-66.163-25.156-73.216-60.011L65.92,64H10.667\n\t\tC4.776,64,0,59.224,0,53.333s4.776-10.667,10.667-10.667h64c5.07-0.001,9.439,3.566,10.453,8.533l53.717,268.587\n\t\tc5.035,24.896,26.888,42.817,52.288,42.88h246.208c5.891,0,10.667,4.776,10.667,10.667S443.224,384,437.333,384z", 2, "fill", "#455A64"], ["cx", "394.667", "cy", "117.333", "r", "117.333", 2, "fill", "#4CAF50"], ["d", "M437.333,128H352c-5.891,0-10.667-4.776-10.667-10.667s4.776-10.667,10.667-10.667h85.333\n\t\tc5.891,0,10.667,4.776,10.667,10.667S443.224,128,437.333,128z", 2, "fill", "#FAFAFA"], ["d", "M394.667,170.667c-5.891,0-10.667-4.776-10.667-10.667V74.667C384,68.776,388.776,64,394.667,64\n\t\tc5.891,0,10.667,4.776,10.667,10.667V160C405.333,165.891,400.558,170.667,394.667,170.667z", 2, "fill", "#FAFAFA"]], template: function CartIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "path", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "circle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "circle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "circle", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjYXJ0LWljb24uY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "Li/Y":
/*!****************************************************!*\
  !*** ./src/app/route-guards/auth-guard.service.ts ***!
  \****************************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AuthGuard {
    constructor(handleLocalStorage, router) {
        this.handleLocalStorage = handleLocalStorage;
        this.router = router;
    }
    canActivate() {
        if (this.handleLocalStorage.getIsAuthenticated() === 'false' ||
            this.handleLocalStorage.getIsAuthenticated() == null) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
AuthGuard.ɵfac = function AuthGuard_Factory(t) { return new (t || AuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["HandleLocalStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "PnL/":
/*!**********************************************************!*\
  !*** ./src/app/category-page/category-page.component.ts ***!
  \**********************************************************/
/*! exports provided: CategoryPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryPageComponent", function() { return CategoryPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_item_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/item-data.service */ "vQsw");
/* harmony import */ var _services_handle_cart_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/handle-cart.service */ "PqqQ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _global_starters_icon_starters_icon_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/starters-icon/starters-icon.component */ "iKEw");
/* harmony import */ var _global_mains_icon_mains_icon_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/mains-icon/mains-icon.component */ "ygTu");
/* harmony import */ var _global_desserts_icon_desserts_icon_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../global/desserts-icon/desserts-icon.component */ "6JSh");
/* harmony import */ var _global_drinks_icon_drinks_icon_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../global/drinks-icon/drinks-icon.component */ "dVxj");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../global/loader/loader.component */ "yPJz");
/* harmony import */ var _global_cart_icon_cart_icon_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../global/cart-icon/cart-icon.component */ "LCe4");












const _c0 = ["startersRef"];
const _c1 = ["mainsRef"];
const _c2 = ["dessertsRef"];
const _c3 = ["alcoholicBeveragesRef"];
const _c4 = function (a0) { return { "active": a0 }; };
function CategoryPageComponent_nav_6_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ul", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_nav_6_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4); return ctx_r10.scrollTo(_r0, 1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "app-starters-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_nav_6_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](11); return ctx_r12.scrollTo(_r4, 2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "app-mains-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_nav_6_Template_a_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](14); return ctx_r13.scrollTo(_r6, 3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "app-desserts-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_nav_6_Template_a_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](17); return ctx_r14.scrollTo(_r8, 4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "app-drinks-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c4, ctx_r1.currentActive === 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c4, ctx_r1.currentActive === 2));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c4, ctx_r1.currentActive === 3));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](10, _c4, ctx_r1.currentActive === 4));
} }
function CategoryPageComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-loader");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_9_div_5_div_10_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_9_div_5_div_10_span_1_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23); const item_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r21.onAdd(item_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-cart-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c5 = function (a0) { return [a0]; };
function CategoryPageComponent_div_9_div_5_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_9_div_5_div_10_div_2_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const item_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r24.onRemove(item_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_9_div_5_div_10_div_2_Template_span_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r26); const item_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r27.onAdd(item_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c5, item_r16.quantity));
} }
function CategoryPageComponent_div_9_div_5_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CategoryPageComponent_div_9_div_5_div_10_span_1_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CategoryPageComponent_div_9_div_5_div_10_div_2_Template, 8, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r16.quantity == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r16.quantity > 0);
} }
function CategoryPageComponent_div_9_div_5_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Not Available.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c6 = function (a0) { return { "not-available": a0 }; };
function CategoryPageComponent_div_9_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "small", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, CategoryPageComponent_div_9_div_5_div_10_Template, 3, 2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, CategoryPageComponent_div_9_div_5_div_11_Template, 3, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r16.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c6, !item_r16.isAvailable));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r16.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r16.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r16.isAvailable == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r16.isAvailable == false);
} }
function CategoryPageComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Starters");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CategoryPageComponent_div_9_div_5_Template, 12, 8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.starters);
} }
function CategoryPageComponent_div_12_div_5_div_10_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_12_div_5_div_10_span_1_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r39); const item_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r37.onAdd(item_r32); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-cart-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_12_div_5_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_12_div_5_div_10_div_2_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r42); const item_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r40.onRemove(item_r32); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_12_div_5_div_10_div_2_Template_span_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r42); const item_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r43.onAdd(item_r32); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c5, item_r32.quantity));
} }
function CategoryPageComponent_div_12_div_5_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CategoryPageComponent_div_12_div_5_div_10_span_1_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CategoryPageComponent_div_12_div_5_div_10_div_2_Template, 8, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r32.quantity == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r32.quantity > 0);
} }
function CategoryPageComponent_div_12_div_5_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Not Available.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_12_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "small", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, CategoryPageComponent_div_12_div_5_div_10_Template, 3, 2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, CategoryPageComponent_div_12_div_5_div_11_Template, 3, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r32.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c6, !item_r32.isAvailable));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r32.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r32.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r32.isAvailable == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r32.isAvailable == false);
} }
function CategoryPageComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Mains");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CategoryPageComponent_div_12_div_5_Template, 12, 8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.mains);
} }
function CategoryPageComponent_div_15_div_5_div_10_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_15_div_5_div_10_span_1_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r55); const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r53.onAdd(item_r48); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-cart-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_15_div_5_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_15_div_5_div_10_div_2_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r58); const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r56.onRemove(item_r48); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_15_div_5_div_10_div_2_Template_span_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r58); const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r59.onAdd(item_r48); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c5, item_r48.quantity));
} }
function CategoryPageComponent_div_15_div_5_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CategoryPageComponent_div_15_div_5_div_10_span_1_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CategoryPageComponent_div_15_div_5_div_10_div_2_Template, 8, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r48.quantity == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r48.quantity > 0);
} }
function CategoryPageComponent_div_15_div_5_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Not Available.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_15_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "small", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, CategoryPageComponent_div_15_div_5_div_10_Template, 3, 2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, CategoryPageComponent_div_15_div_5_div_11_Template, 3, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r48 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r48.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c6, !item_r48.isAvailable));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r48.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r48.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r48.isAvailable == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r48.isAvailable == false);
} }
function CategoryPageComponent_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Desserts");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CategoryPageComponent_div_15_div_5_Template, 12, 8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r7.desserts);
} }
function CategoryPageComponent_div_18_div_5_div_10_span_1_Template(rf, ctx) { if (rf & 1) {
    const _r71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_18_div_5_div_10_span_1_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r71); const item_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r69.onAdd(item_r64); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-cart-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_18_div_5_div_10_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_18_div_5_div_10_div_2_Template_span_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r74); const item_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r72.onRemove(item_r64); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CategoryPageComponent_div_18_div_5_div_10_div_2_Template_span_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r74); const item_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit; const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r75.onAdd(item_r64); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "+");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c5, item_r64.quantity));
} }
function CategoryPageComponent_div_18_div_5_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CategoryPageComponent_div_18_div_5_div_10_span_1_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CategoryPageComponent_div_18_div_5_div_10_div_2_Template, 8, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r64.quantity == 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r64.quantity > 0);
} }
function CategoryPageComponent_div_18_div_5_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Not Available.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CategoryPageComponent_div_18_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "small", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, CategoryPageComponent_div_18_div_5_div_10_Template, 3, 2, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, CategoryPageComponent_div_18_div_5_div_11_Template, 3, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r64 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r64.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c6, !item_r64.isAvailable));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r64.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r64.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r64.isAvailable == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", item_r64.isAvailable == false);
} }
function CategoryPageComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Alcoholic Beverages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, CategoryPageComponent_div_18_div_5_Template, 12, 8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r9.alcoholicBeverages);
} }
class CategoryPageComponent {
    constructor(router, itemDataService, route, handleCartService) {
        this.router = router;
        this.itemDataService = itemDataService;
        this.route = route;
        this.handleCartService = handleCartService;
        this._starters = [];
        this._mains = [];
        this._alcoholicBeverages = [];
        this._desserts = [];
        // merged item data with cart data
        this.starters = [];
        this.mains = [];
        this.alcoholicBeverages = [];
        this.desserts = [];
        this.isLoading = false;
        this.isLoaded = false;
        this.sectionName = '';
        this.showCategoryNavbar = false;
        this.startersOffset = null;
        this.mainsOffset = null;
        this.dessertsOffset = null;
        this.alcoholicBeveragesOffset = null;
        this.route.fragment.subscribe((data) => {
            this.sectionName = data;
        });
    }
    ngOnInit() {
        this.fetchItems();
    }
    /** for controlling the change of nav-pills in navbar on scroll position */
    ngAfterViewInit() {
        this.startersOffset = this.startersRef.nativeElement.offsetTop;
        this.mainsOffset = this.mainsRef.nativeElement.offsetTop;
        this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop;
        this.alcoholicBeveragesOffset =
            this.alcoholicBeveragesRef.nativeElement.offsetTop;
    }
    checkOffsetTop() {
        this.startersOffset = this.startersRef.nativeElement.offsetTop + 200;
        this.mainsOffset = this.mainsRef.nativeElement.offsetTop - 200;
        this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop - 200;
        this.alcoholicBeveragesOffset =
            this.alcoholicBeveragesRef.nativeElement.offsetTop - 200;
        if (window.pageYOffset >= this.startersOffset &&
            window.pageYOffset < this.mainsOffset) {
            this.currentActive = 1;
            this.showCategoryNavbar = true;
        }
        else if (window.pageYOffset >= this.mainsOffset &&
            window.pageYOffset < this.dessertsOffset) {
            this.currentActive = 2;
            this.showCategoryNavbar = true;
        }
        else if (window.pageYOffset >= this.dessertsOffset &&
            window.pageYOffset < this.alcoholicBeveragesOffset) {
            this.currentActive = 3;
            this.showCategoryNavbar = true;
        }
        else if (window.pageYOffset >= this.alcoholicBeveragesOffset) {
            this.currentActive = 4;
            this.showCategoryNavbar = true;
        }
        else {
            this.currentActive = 0;
            this.showCategoryNavbar = false;
        }
    }
    scrollTo(el, v) {
        //el.scrollIntoView({ block: 'start', inline: 'nearest' });
        el.scrollIntoView();
        this.currentActive = v;
    }
    /** ---------  */
    fetchItems() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.isLoading = true;
                this._starters = yield this.itemDataService.getItemsCategoryWise('starters');
                this._mains = yield this.itemDataService.getItemsCategoryWise('mains');
                this._alcoholicBeverages =
                    yield this.itemDataService.getItemsCategoryWise('alcoholic-beverages');
                this._desserts = yield this.itemDataService.getItemsCategoryWise('desserts');
                this.mergeItemAndCartData();
                this.isLoading = false;
                this.isLoaded = true;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchCartData() {
        this.cartData = this.handleCartService.getCartData();
    }
    mergeItemAndCartData() {
        this.fetchCartData();
        for (let key in this._starters) {
            let count = 0;
            const id = this._starters[key].id;
            if (this.cartData != null) {
                const itemDetailsObj = this.cartData.items[id];
                if (itemDetailsObj != undefined &&
                    itemDetailsObj.quantity != undefined) {
                    count = this.cartData.items[id].quantity;
                }
            }
            this.starters[key] = Object.assign(Object.assign({}, this._starters[key]), { quantity: count });
        }
        for (let key in this._mains) {
            let count = 0;
            const id = this._mains[key].id;
            if (this.cartData != null) {
                const itemDetailsObj = this.cartData.items[id];
                if (itemDetailsObj != undefined &&
                    itemDetailsObj.quantity != undefined) {
                    count = this.cartData.items[id].quantity;
                }
            }
            this.mains[key] = Object.assign(Object.assign({}, this._mains[key]), { quantity: count });
        }
        for (let key in this._desserts) {
            let count = 0;
            const id = this._desserts[key].id;
            if (this.cartData != null) {
                const itemDetailsObj = this.cartData.items[id];
                if (itemDetailsObj != undefined &&
                    itemDetailsObj.quantity != undefined) {
                    count = this.cartData.items[id].quantity;
                }
            }
            this.desserts[key] = Object.assign(Object.assign({}, this._desserts[key]), { quantity: count });
        }
        for (let key in this._alcoholicBeverages) {
            let count = 0;
            const id = this._alcoholicBeverages[key].id;
            if (this.cartData != null) {
                const itemDetailsObj = this.cartData.items[id];
                if (itemDetailsObj != undefined &&
                    itemDetailsObj.quantity != undefined) {
                    count = this.cartData.items[id].quantity;
                }
            }
            this.alcoholicBeverages[key] = Object.assign(Object.assign({}, this._alcoholicBeverages[key]), { quantity: count });
        }
    }
    /** add to cart */
    onAdd(item) {
        item.quantity += 1; //two-way binded
        this.handleCartService.addOrUpdate(item);
    }
    /** remove from cart */
    onRemove(item) {
        item.quantity -= 1; //two-way binded
        this.handleCartService.removeItem(item);
    }
}
CategoryPageComponent.ɵfac = function CategoryPageComponent_Factory(t) { return new (t || CategoryPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_item_data_service__WEBPACK_IMPORTED_MODULE_3__["ItemDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_handle_cart_service__WEBPACK_IMPORTED_MODULE_4__["HandleCartService"])); };
CategoryPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CategoryPageComponent, selectors: [["app-category-page"]], viewQuery: function CategoryPageComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c3, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.startersRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.mainsRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dessertsRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.alcoholicBeveragesRef = _t.first);
    } }, hostBindings: function CategoryPageComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("scroll", function CategoryPageComponent_scroll_HostBindingHandler($event) { return ctx.checkOffsetTop($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, decls: 19, vars: 6, consts: [[1, "album", "py-5"], [1, "container"], [1, "d-flex", "flex-row-reverse", 2, "margin-bottom", "30px"], ["startersRef", ""], [1, "p-2"], ["class", "sticky-top category-navbar", 4, "ngIf"], ["class", "loader-div", 4, "ngIf"], ["id", "starters", 1, "section", 2, "scroll-margin-top", "0rem"], ["class", "items-div", 4, "ngIf"], ["id", "mains", 1, "section"], ["mainsRef", ""], ["id", "desserts", 1, "section"], ["dessertsRef", ""], ["id", "alcoholic-beverages", 1, "section"], ["alcoholicBeveragesRef", ""], [1, "sticky-top", "category-navbar"], [1, "nav", "nav-pills", "nav-justified", "text-light", "category-ul-nav"], [1, "nav-item"], [1, "nav-link", 3, "ngClass", "click"], [1, "loader-div"], [1, "items-div"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], [1, "row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3"], ["class", "col", 4, "ngFor", "ngForOf"], [1, "col"], [1, "card"], ["role", "img", "aria-label", "item-image", "preserveAspectRatio", "xMidYMid slice", "focusable", "false", 1, "img-loading", "card-img-top", 3, "ngClass", "src"], [1, "card-body"], [1, "card-text"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "text-dark", "item-price"], ["class", "btn-group", 4, "ngIf"], [4, "ngIf"], [1, "btn-group"], ["class", "btn btn-sm", 3, "click", 4, "ngIf"], ["class", "btn-toolbar", "role", "toolbar", 4, "ngIf"], [1, "btn", "btn-sm", 3, "click"], ["role", "toolbar", 1, "btn-toolbar"], ["role", "group", "aria-label", "-", 1, "btn-group"], ["type", "button", 1, "btn", "btn-outline-danger", "btn-sm", 3, "click"], [1, "text-center", 2, "width", "30px"], ["type", "button", 1, "btn", "btn-outline-success", "btn-sm", 3, "click"], [1, "not-available-text"]], template: function CategoryPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, CategoryPageComponent_nav_6_Template, 15, 12, "nav", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, CategoryPageComponent_div_7_Template, 2, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "section", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, CategoryPageComponent_div_9_Template, 6, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "section", 9, 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, CategoryPageComponent_div_12_Template, 6, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "section", 11, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, CategoryPageComponent_div_15_Template, 6, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "section", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, CategoryPageComponent_div_18_Template, 6, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showCategoryNavbar == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading == true && ctx.isLoaded == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _global_starters_icon_starters_icon_component__WEBPACK_IMPORTED_MODULE_6__["StartersIconComponent"], _global_mains_icon_mains_icon_component__WEBPACK_IMPORTED_MODULE_7__["MainsIconComponent"], _global_desserts_icon_desserts_icon_component__WEBPACK_IMPORTED_MODULE_8__["DessertsIconComponent"], _global_drinks_icon_drinks_icon_component__WEBPACK_IMPORTED_MODULE_9__["DrinksIconComponent"], _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_10__["LoaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _global_cart_icon_cart_icon_component__WEBPACK_IMPORTED_MODULE_11__["CartIconComponent"]], styles: ["section[_ngcontent-%COMP%] {\r\n    scroll-margin-top: 6rem;\r\n}\r\n\r\nimg[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 300px;\r\n    object-fit: cover;\r\n}\r\n\r\n.item-price[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n    color: black;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n    border-radius: 1.3em;\r\n}\r\n\r\n.card-img-top[_ngcontent-%COMP%] {\r\n    border-top-left-radius: 1.3em;\r\n    border-top-right-radius: 1.3em;\r\n}\r\n\r\n.card-text[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n    color: black;\r\n}\r\n\r\n.item-category[_ngcontent-%COMP%] {\r\n    white-space: pre-wrap;\r\n    font-size: 14px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.item-price[_ngcontent-%COMP%] {\r\n    margin-right: 10px;\r\n}\r\n\r\n.loader-div[_ngcontent-%COMP%] {\r\n    margin-top: 250px;\r\n    min-height: 60vh;\r\n}\r\n\r\n.img-loading[_ngcontent-%COMP%] {\r\n    background-color: #e2e2e2;\r\n    background-image: linear-gradient(0deg, #e2e2e2 0%, #f7f7f7 100%);\r\n}\r\n\r\ndiv.card[_ngcontent-%COMP%] {\r\n    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\r\n}\r\n\r\ndiv.card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-0.1rem) scale(1);\r\n    box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.items-div[_ngcontent-%COMP%] {\r\n    margin-bottom: 80px;\r\n}\r\n\r\n.category-navbar[_ngcontent-%COMP%] {\r\n    background-color: white;\r\n    color: black;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    margin-top: 80px;\r\n    margin-bottom: 80px;\r\n    border-bottom-left-radius: 0.5em;\r\n    border-bottom-right-radius: 0.5em;\r\n    font-size: 18px;\r\n    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;\r\n}\r\n\r\n.nav-pills[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%], .nav-pills[_ngcontent-%COMP%]   .show[_ngcontent-%COMP%] > .nav-link[_ngcontent-%COMP%] {\r\n    color: rgb(255, 255, 255);\r\n    background-color: #e7e7e7d8;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%] {\r\n    color: #000000;\r\n}\r\n\r\n.btn-sm[_ngcontent-%COMP%], .btn-group-sm[_ngcontent-%COMP%] > .btn[_ngcontent-%COMP%] {\r\n    padding: 0.0rem 0.6rem;\r\n    font-size: 0.875rem;\r\n    border-radius: 0.2rem;\r\n    font-size: 17px;\r\n}\r\n\r\n.not-available[_ngcontent-%COMP%] {\r\n    filter: grayscale(1);\r\n}\r\n\r\n.not-available-text[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n    color: red;\r\n}\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    .nav-link[_ngcontent-%COMP%] {\r\n        padding-top: 0.5rem;\r\n        padding-right: 0.5rem;\r\n        padding-bottom: 0.5rem;\r\n        padding-left: 0.5rem;\r\n    }\r\n    .category-navbar[_ngcontent-%COMP%] {\r\n        font-size: 15px;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    .nav-link[_ngcontent-%COMP%] {\r\n        padding-top: 0.5rem;\r\n        padding-right: 0.5rem;\r\n        padding-bottom: 0.5rem;\r\n        padding-left: 0.5rem;\r\n    }\r\n    .category-navbar[_ngcontent-%COMP%] {\r\n        font-size: 15px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3J5LXBhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxnQ0FBZ0M7SUFDaEMsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGlFQUFpRTtBQUNyRTs7QUFFQTtJQUNJLGlEQUFpRDtBQUNyRDs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QyxpREFBaUQ7QUFDckQ7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsaUNBQWlDO0lBQ2pDLGVBQWU7SUFDZixtREFBbUQ7QUFDdkQ7O0FBRUE7O0lBRUkseUJBQXlCO0lBQ3pCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBRUE7O0lBRUksc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQixxQkFBcUI7SUFDckIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixVQUFVO0FBQ2Q7O0FBR0E7OztDQUdDOztBQUVEO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0QixvQkFBb0I7SUFDeEI7SUFDQTtRQUNJLGVBQWU7SUFDbkI7QUFDSjs7QUFHQTs7O0NBR0M7O0FBRUQ7SUFDSTtRQUNJLG1CQUFtQjtRQUNuQixxQkFBcUI7UUFDckIsc0JBQXNCO1FBQ3RCLG9CQUFvQjtJQUN4QjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtBQUNKIiwiZmlsZSI6ImNhdGVnb3J5LXBhZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlY3Rpb24ge1xyXG4gICAgc2Nyb2xsLW1hcmdpbi10b3A6IDZyZW07XHJcbn1cclxuXHJcbmltZyB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMzAwcHg7XHJcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxufVxyXG5cclxuLml0ZW0tcHJpY2Uge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgICBmb250LWZhbWlseTogXCJLYXJsYVwiLCBzYW5zLXNlcmlmO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMS4zZW07XHJcbn1cclxuXHJcbi5jYXJkLWltZy10b3Age1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMS4zZW07XHJcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMS4zZW07XHJcbn1cclxuXHJcbi5jYXJkLXRleHQge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG59XHJcblxyXG4uaXRlbS1jYXRlZ29yeSB7XHJcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59XHJcblxyXG4uaXRlbS1wcmljZSB7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5sb2FkZXItZGl2IHtcclxuICAgIG1hcmdpbi10b3A6IDI1MHB4O1xyXG4gICAgbWluLWhlaWdodDogNjB2aDtcclxufVxyXG5cclxuLmltZy1sb2FkaW5nIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7XHJcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoMGRlZywgI2UyZTJlMiAwJSwgI2Y3ZjdmNyAxMDAlKTtcclxufVxyXG5cclxuZGl2LmNhcmQge1xyXG4gICAgYm94LXNoYWRvdzogcmdiYSgxNDksIDE1NywgMTY1LCAwLjIpIDBweCA4cHggMjRweDtcclxufVxyXG5cclxuZGl2LmNhcmQ6aG92ZXIge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0wLjFyZW0pIHNjYWxlKDEpO1xyXG4gICAgYm94LXNoYWRvdzogMCAwLjVlbSAzcmVtIC0xcmVtIHJnYmEoMCwgMCwgMCwgMC41KTtcclxufVxyXG5cclxuLml0ZW1zLWRpdiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4MHB4O1xyXG59XHJcblxyXG4uY2F0ZWdvcnktbmF2YmFyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gICAgY29sb3I6IGJsYWNrO1xyXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIG1hcmdpbi10b3A6IDgwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4MHB4O1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMC41ZW07XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMC41ZW07XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMTUpIDEuOTVweCAxLjk1cHggMi42cHg7XHJcbn1cclxuXHJcbi5uYXYtcGlsbHMgLm5hdi1saW5rLmFjdGl2ZSxcclxuLm5hdi1waWxscyAuc2hvdz4ubmF2LWxpbmsge1xyXG4gICAgY29sb3I6IHJnYigyNTUsIDI1NSwgMjU1KTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNlN2U3ZTdkODtcclxufVxyXG5cclxuLm5hdi1saW5rIHtcclxuICAgIGNvbG9yOiAjMDAwMDAwO1xyXG59XHJcblxyXG4uYnRuLXNtLFxyXG4uYnRuLWdyb3VwLXNtPi5idG4ge1xyXG4gICAgcGFkZGluZzogMC4wcmVtIDAuNnJlbTtcclxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjJyZW07XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbn1cclxuXHJcbi5ub3QtYXZhaWxhYmxlIHtcclxuICAgIGZpbHRlcjogZ3JheXNjYWxlKDEpO1xyXG59XHJcblxyXG4ubm90LWF2YWlsYWJsZS10ZXh0IHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcblxyXG4vKlxyXG4jI0RldmljZSA9IExvdyBSZXNvbHV0aW9uIFRhYmxldHMsIE1vYmlsZXMgKExhbmRzY2FwZSlcclxuIyNTY3JlZW4gPSBCL3cgNDgxcHggdG8gNzY3cHhcclxuKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAubmF2LWxpbmsge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogMC41cmVtO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XHJcbiAgICB9XHJcbiAgICAuY2F0ZWdvcnktbmF2YmFyIHtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKiBcclxuIyNEZXZpY2UgPSBNb3N0IG9mIHRoZSBTbWFydHBob25lcyBNb2JpbGVzIChQb3J0cmFpdClcclxuIyNTY3JlZW4gPSBCL3cgMzIwcHggdG8gNDc5cHhcclxuKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAubmF2LWxpbmsge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogMC41cmVtO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XHJcbiAgICB9XHJcbiAgICAuY2F0ZWdvcnktbmF2YmFyIHtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ "PqqQ":
/*!*************************************************!*\
  !*** ./src/app/services/handle-cart.service.ts ***!
  \*************************************************/
/*! exports provided: HandleCartService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HandleCartService", function() { return HandleCartService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _handle_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handle-local-storage.service */ "Dm4p");



class HandleCartService {
    constructor(handleLocalStorageService) {
        this.handleLocalStorageService = handleLocalStorageService;
        this.itemsArray = [];
        this.onCartPageSub = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.onConfirmOrderPageSub = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
    }
    ngOnInit() {
        this.cartObj = this.getCartData();
    }
    /** add or update items in cart */
    addOrUpdate(item) {
        // get cart data from local storage
        this.cartObj = this.getCartData();
        // add cart object for the first time
        if (this.cartObj == null) {
            const cart = {
                items: {
                    [item.id]: {
                        addedOn: new Date().toLocaleString(),
                        quantity: item.quantity,
                        itemId: item.id,
                        category: item.category,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageUrl,
                    },
                },
                totalAmt: item.price,
            };
            this.handleLocalStorageService.addCartData(cart);
        }
        else {
            // add a new item to cart
            if (this.cartObj.items[item.id] == undefined) {
                const itemD = {
                    [item.id]: {
                        addedOn: new Date().toLocaleString(),
                        quantity: item.quantity,
                        itemId: item.id,
                        category: item.category,
                        name: item.name,
                        price: item.price,
                        imageUrl: item.imageUrl,
                    },
                };
                // any better way?
                this.cartObj = {
                    items: Object.assign(Object.assign({}, this.cartObj.items), { [item.id]: itemD[item.id] }),
                    totalAmt: this.getCartTotalAmount(item.price, true),
                };
                this.handleLocalStorageService.addCartData(this.cartObj);
            }
            else {
                // update quantity for existing item
                const itemD = this.cartObj.items[item.id];
                itemD.quantity += 1;
                this.cartObj.items[item.id] = itemD;
                // update total amount
                this.cartObj.totalAmt = this.getCartTotalAmount(item.price, true);
                this.handleLocalStorageService.addCartData(this.cartObj);
            }
        }
    }
    /** remove an item from cart */
    removeItem(item) {
        this.cartObj = this.getCartData();
        if (this.cartObj != null) {
            const itemD = this.cartObj.items[item.id];
            if (itemD.quantity > 1) {
                // decrease the quantity
                itemD.quantity -= 1;
                this.cartObj.items[item.id] = itemD;
            }
            else if (itemD.quantity == 1) {
                // when quantity is 1
                // remove the item
                delete this.cartObj.items[item.id];
            }
            this.cartObj.totalAmt = this.getCartTotalAmount(item.price, false);
        }
        this.handleLocalStorageService.addCartData(this.cartObj);
    }
    /** calculate total cart amount */
    getCartTotalAmount(price, add) {
        let amt;
        if (add == true) {
            amt = Number(this.cartObj.totalAmt) + Number(price);
        }
        else {
            amt = Number(this.cartObj.totalAmt) - Number(price);
        }
        return amt;
    }
    /** check for cart data in local storage or Firebase */
    getCartData() {
        if (this.handleLocalStorageService.getCartData() != null) {
            return JSON.parse(this.handleLocalStorageService.getCartData());
        }
        return null;
    }
    /** clear cart */
    clearCart() {
        this.cartObj = null;
        this.handleLocalStorageService.removeCartData();
    }
    onCartPageObs() {
        this.onCartPageSub.next(false);
        return this.onCartPageSub.asObservable();
    }
    goToOrders(v) {
        this.onCartPageSub.next(v);
    }
    onConfirmOrderPageObs() {
        return this.onConfirmOrderPageSub.asObservable();
    }
    hideCartBar(v) {
        this.onConfirmOrderPageSub.next(v);
    }
}
HandleCartService.ɵfac = function HandleCartService_Factory(t) { return new (t || HandleCartService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["HandleLocalStorageService"])); };
HandleCartService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: HandleCartService, factory: HandleCartService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "SBxm":
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_auth_error_handler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/auth-error-handler.service */ "Tb8I");
/* harmony import */ var src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-data.service */ "DPk/");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function SignupComponent_span_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "What's your name?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please enter a valid email.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_span_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.errorObj.signUp.email);
} }
function SignupComponent_span_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Password length must be greater than 8.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function SignupComponent_i_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "i", 21);
} }
function SignupComponent_span_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 22);
} }
function SignupComponent_i_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "i", 23);
} }
function SignupComponent_span_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r7.errorObj.signUp.unknown);
} }
const _c0 = function (a0) { return { "error-border": a0 }; };
const _c1 = function () { return ["/login"]; };
class SignupComponent {
    constructor(authService, router, authErrorHandler, userDataService) {
        this.authService = authService;
        this.router = router;
        this.authErrorHandler = authErrorHandler;
        this.userDataService = userDataService;
        this.isBtnClicked = false;
        this.isSignedUp = false;
        this.isHideResponseErrors = true;
        this.isSigningUp = false;
        // creating a subscription to listen to the subject in authService
        // so that we get updated whenever the errorObj changes
        this.errorSub = authErrorHandler.getErrorObservable().subscribe((data) => {
            this.errorObj = data;
        });
        // calls the next method on subject in authService
        // and we get the errorObj data here
        this.authErrorHandler.initializeErrorObj();
    }
    ngOnInit() {
        // creating reactive signup form
        this.signUpForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].email]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].minLength(8),
            ]),
        });
        // reset the errorObj
        // so that previous errors don't come up in view 
        this.errorObj = {
            logIn: {
                errorFound: null,
                email: null,
                password: null,
                unknown: null,
            },
            signUp: {
                errorFound: null,
                name: null,
                email: null,
                password: null,
                unknown: null,
            },
        };
    }
    ngOnDestroy() {
        this.errorSub.unsubscribe();
    }
    /** method binded to form ngSubmit event */
    onSignUp() {
        // handle the case when disabled attribute for submit button is deleted
        // from html
        if (this.signUpForm.invalid) {
            return;
        }
        this.isBtnClicked = true;
        this.isSigningUp = true;
        this.name = this.signUpForm.get('name').value;
        this.email = this.signUpForm.get('email').value;
        this.password = this.signUpForm.get('password').value;
        this.authService
            .signUp(this.email, this.password)
            .then((result) => {
            this.isSignedUp = true;
            this.isSigningUp = false;
            this.isHideResponseErrors = true;
            this.userDataService.createNewUser(this.name, this.email, result.user.uid);
            setTimeout(() => {
                this.router.navigate(['']);
            }, 1500);
        })
            .catch((error) => {
            this.isSignedUp = false;
            this.isSigningUp = false;
            this.isBtnClicked = false;
            this.isHideResponseErrors = false;
            this.authErrorHandler.handleAuthError(error, 'signUp');
        });
    }
    /** on clicking sign up with google */
    onSignUpWithGoogle() {
        this.authService
            .authenticateWithGoogle()
            .then((result) => {
            // save user data only the first time
            if (result.additionalUserInfo.isNewUser == true) {
                this.userDataService.createNewUser(result.user.displayName, result.user.email, result.user.uid);
            }
            setTimeout(() => {
                this.router.navigate(['']);
            }, 1500);
        })
            .catch((error) => {
            this.authErrorHandler.handleAuthError(error, 'signUp');
        });
    }
    /** hides error messages on input click */
    hideResponseErrors() {
        if (this.authErrorHandler.foundSignUpError &&
            this.isHideResponseErrors === false) {
            this.isHideResponseErrors = !this.isHideResponseErrors;
            this.authErrorHandler.clearSignUpError();
        }
    }
}
SignupComponent.ɵfac = function SignupComponent_Factory(t) { return new (t || SignupComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_error_handler_service__WEBPACK_IMPORTED_MODULE_4__["AuthErrorHandlerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_5__["UserDataService"])); };
SignupComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: SignupComponent, selectors: [["app-signup"]], decls: 32, vars: 15, consts: [[1, "form-signin"], [1, "h3", "mb-3", "fw-normal"], [3, "formGroup", "ngSubmit"], [1, "form-floating"], ["type", "name", "id", "name", "placeholder", "Sreya Saha", "formControlName", "name", 1, "form-control"], ["for", "floatingInput", 1, "floating-label"], ["class", "error-text", 4, "ngIf"], [1, "form-floating", 3, "click"], ["type", "email", "id", "email", "placeholder", "name@example.com", "formControlName", "email", 1, "form-control", 3, "ngClass"], ["type", "password", "id", "password", "placeholder", "Password", "name", "password", "formControlName", "password", 1, "form-control"], ["for", "floatingPassword", 1, "floating-label"], ["type", "submit", 1, "w-100", "btn", "btn-lg", "btn-primary", 3, "disabled"], ["class", "fa fa-arrow-right", 4, "ngIf"], ["class", "spinner-border spinner-border-sm", "role", "status", "aria-hidden", "true", 4, "ngIf"], ["class", "fa fa-check", "aria-hidden", "true", 4, "ngIf"], ["type", "button", 1, "w-100", "btn", "btn-lg", "btn-primary", "google-btn", 2, "margin-bottom", "25px", 3, "click"], [1, "google-btn-text"], ["class", "unknown-error-text", 4, "ngIf"], [1, "mobile-only"], [3, "routerLink"], [1, "error-text"], [1, "fa", "fa-arrow-right"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], ["aria-hidden", "true", 1, "fa", "fa-check"], [1, "unknown-error-text"]], template: function SignupComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function SignupComponent_Template_form_ngSubmit_3_listener() { return ctx.onSignUp(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, SignupComponent_span_8_Template, 2, 0, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SignupComponent_Template_div_click_9_listener() { return ctx.hideResponseErrors(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "Email address");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, SignupComponent_span_13_Template, 2, 0, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, SignupComponent_span_14_Template, 2, 1, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, SignupComponent_span_19_Template, 2, 0, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, SignupComponent_i_21_Template, 1, 0, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, SignupComponent_span_22_Template, 1, 0, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, SignupComponent_i_23_Template, 1, 0, "i", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SignupComponent_Template_button_click_24_listener() { return ctx.onSignUpWithGoogle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Sign up with Google");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, SignupComponent_span_27_Template, 2, 1, "span", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "p", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Have an account? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Log in");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.signUpForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.signUpForm.controls.name.errors != null && ctx.signUpForm.controls.name.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](12, _c0, !ctx.isHideResponseErrors && ctx.errorObj.signUp.email != null));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.signUpForm.controls.email.errors != null && ctx.signUpForm.controls.email.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isHideResponseErrors && ctx.errorObj.signUp.email != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.signUpForm.controls.password.errors != null && ctx.signUpForm.controls.password.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.signUpForm.valid || ctx.isBtnClicked || ctx.isSignedUp);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isSigningUp && !ctx.isSignedUp);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isSigningUp);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isSignedUp && ctx.isBtnClicked);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errorObj.signUp.unknown != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](14, _c1));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: [".form-signin[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    max-width: 330px;\r\n    margin: auto;\r\n    padding-top: 150px;\r\n    padding-bottom: 180px;\r\n    min-height: 70vh;\r\n}\r\n\r\n.floating-label[_ngcontent-%COMP%] {\r\n    color: rgb(109, 109, 109)\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%] {\r\n    font-weight: 400;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   .form-floating[_ngcontent-%COMP%]:focus-within {\r\n    z-index: 2;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"name\"][_ngcontent-%COMP%] {\r\n    margin-bottom: -1px;\r\n    border-top-left-radius: 0;\r\n    border-top-right-radius: 0;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"email\"][_ngcontent-%COMP%] {\r\n    margin-bottom: -1px;\r\n    border-bottom-right-radius: 0;\r\n    border-bottom-left-radius: 0;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"password\"][_ngcontent-%COMP%] {\r\n    margin-bottom: 10px;\r\n    border-top-left-radius: 0;\r\n    border-top-right-radius: 0;\r\n}\r\n\r\nbutton[type=\"submit\"][_ngcontent-%COMP%]:disabled {\r\n    background-color: rgb(173, 173, 173);\r\n    border-color: inherit;\r\n}\r\n\r\ninput[type=\"name\"].ng-invalid.ng-touched[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n}\r\n\r\ninput[type=\"email\"].ng-invalid.ng-touched[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n}\r\n\r\ninput[type=\"password\"].ng-invalid.ng-touched[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n    margin-bottom: -1px;\r\n}\r\n\r\n.error-text[_ngcontent-%COMP%] {\r\n    color: rgb(255, 83, 83);\r\n    font-size: 13px;\r\n    margin-left: 13px;\r\n}\r\n\r\n.error-border[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n}\r\n\r\n.unknown-error-text[_ngcontent-%COMP%] {\r\n    color: rgb(255, 83, 83);\r\n    font-size: 13px;\r\n    margin-top: 10px;\r\n}\r\n\r\n.google-btn[_ngcontent-%COMP%] {\r\n    margin-top: 10px;\r\n}\r\n\r\n.google-btn-text[_ngcontent-%COMP%] {\r\n    font-size: 16px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZ251cC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osa0JBQWtCO0lBQ2xCLHFCQUFxQjtJQUNyQixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSTtBQUNKOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHlCQUF5QjtJQUN6QiwwQkFBMEI7QUFDOUI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtDQUFrQztJQUNsQyxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQiIsImZpbGUiOiJzaWdudXAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3JtLXNpZ25pbiB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIG1heC13aWR0aDogMzMwcHg7XHJcbiAgICBtYXJnaW46IGF1dG87XHJcbiAgICBwYWRkaW5nLXRvcDogMTUwcHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTgwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiA3MHZoO1xyXG59XHJcblxyXG4uZmxvYXRpbmctbGFiZWwge1xyXG4gICAgY29sb3I6IHJnYigxMDksIDEwOSwgMTA5KVxyXG59XHJcblxyXG4uZm9ybS1zaWduaW4gLmNoZWNrYm94IHtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbn1cclxuXHJcbi5mb3JtLXNpZ25pbiAuZm9ybS1mbG9hdGluZzpmb2N1cy13aXRoaW4ge1xyXG4gICAgei1pbmRleDogMjtcclxufVxyXG5cclxuLmZvcm0tc2lnbmluIGlucHV0W3R5cGU9XCJuYW1lXCJdIHtcclxuICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDA7XHJcbn1cclxuXHJcbi5mb3JtLXNpZ25pbiBpbnB1dFt0eXBlPVwiZW1haWxcIl0ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTFweDtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcclxufVxyXG5cclxuLmZvcm0tc2lnbmluIGlucHV0W3R5cGU9XCJwYXNzd29yZFwiXSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xyXG59XHJcblxyXG5idXR0b25bdHlwZT1cInN1Ym1pdFwiXTpkaXNhYmxlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTczLCAxNzMsIDE3Myk7XHJcbiAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJuYW1lXCJdLm5nLWludmFsaWQubmctdG91Y2hlZCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjU1LCA4MywgODMpO1xyXG59XHJcblxyXG5pbnB1dFt0eXBlPVwiZW1haWxcIl0ubmctaW52YWxpZC5uZy10b3VjaGVkIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigyNTUsIDgzLCA4Myk7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJwYXNzd29yZFwiXS5uZy1pbnZhbGlkLm5nLXRvdWNoZWQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgODMsIDgzKTtcclxuICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XHJcbn1cclxuXHJcbi5lcnJvci10ZXh0IHtcclxuICAgIGNvbG9yOiByZ2IoMjU1LCA4MywgODMpO1xyXG4gICAgZm9udC1zaXplOiAxM3B4O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEzcHg7XHJcbn1cclxuXHJcbi5lcnJvci1ib3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgODMsIDgzKTtcclxufVxyXG5cclxuLnVua25vd24tZXJyb3ItdGV4dCB7XHJcbiAgICBjb2xvcjogcmdiKDI1NSwgODMsIDgzKTtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5nb29nbGUtYnRuIHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5nb29nbGUtYnRuLXRleHQge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG59Il19 */"] });


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/auth.service */ "lGQG");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/user-data.service */ "DPk/");
/* harmony import */ var _global_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./global/navbar/navbar.component */ "0Gr/");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _global_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global/footer/footer.component */ "HNvH");
/* harmony import */ var _cart_cart_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/cart.component */ "c2A7");







class AppComponent {
    constructor(authService, userDataService) {
        this.authService = authService;
        this.userDataService = userDataService;
    }
    ngOnInit() {
        // auto log in user if local storage has the uid returned by firebase
        this.authService.autoLogIn();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_user_data_service__WEBPACK_IMPORTED_MODULE_2__["UserDataService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 4, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-navbar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-cart");
    } }, directives: [_global_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterOutlet"], _global_footer_footer_component__WEBPACK_IMPORTED_MODULE_5__["FooterComponent"], _cart_cart_component__WEBPACK_IMPORTED_MODULE_6__["CartComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "Tb8I":
/*!********************************************************!*\
  !*** ./src/app/services/auth-error-handler.service.ts ***!
  \********************************************************/
/*! exports provided: AuthErrorHandlerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthErrorHandlerService", function() { return AuthErrorHandlerService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


class AuthErrorHandlerService {
    constructor() {
        this.errorSubject = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.errorObj = {
            logIn: {
                errorFound: null,
                email: null,
                password: null,
                unknown: null,
            },
            signUp: {
                errorFound: null,
                name: null,
                email: null,
                password: null,
                unknown: null,
            },
        };
    }
    getErrorObservable() {
        return this.errorSubject.asObservable();
    }
    initializeErrorObj() {
        this.errorSubject.next(this.errorObj);
    }
    foundLogInError() {
        return !(this.errorObj.logIn.errorFound === null);
    }
    foundSignUpError() {
        return !(this.errorObj.signUp.errorFound === null);
    }
    handleAuthError(errorParam, callerParam) {
        if (callerParam === 'logIn') {
            this.errorObj.logIn.errorFound = true;
            switch (errorParam.code) {
                case 'auth/user-not-found':
                    this.errorObj.logIn.email = 'Email not registered.';
                    break;
                case 'auth/wrong-password':
                    this.errorObj.logIn.password = "Password doesn't match.";
                    break;
                default:
                    this.errorObj.logIn.unknown = errorParam.message;
                    break;
            }
        }
        else if (callerParam === 'signUp') {
            switch (errorParam.code) {
                case 'auth/email-already-in-use':
                    this.errorObj.signUp.email = 'Email already in use.';
                    break;
                case 'auth/invalid-email':
                    this.errorObj.signUp.email = 'Please enter a valid email.';
                    break;
                default:
                    this.errorObj.signUp.unknown = errorParam.message;
                    break;
            }
        }
        this.errorSubject.next(this.errorObj);
    }
    // set all error logIn fields to null
    clearLogInError() {
        Object.entries(this.errorObj.logIn).forEach(([key, val]) => {
            this.errorObj.logIn[key] = null;
        });
        this.errorSubject.next(this.errorObj);
    }
    // set all error signUp fields to null
    clearSignUpError() {
        Object.entries(this.errorObj.signUp).forEach(([key, val]) => {
            this.errorObj.signUp[key] = null;
        });
        this.errorSubject.next(this.errorObj);
    }
}
AuthErrorHandlerService.ɵfac = function AuthErrorHandlerService_Factory(t) { return new (t || AuthErrorHandlerService)(); };
AuthErrorHandlerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: AuthErrorHandlerService, factory: AuthErrorHandlerService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "UvY/":
/*!*********************************************************!*\
  !*** ./src/app/home/categories/categories.component.ts ***!
  \*********************************************************/
/*! exports provided: CategoriesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriesComponent", function() { return CategoriesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class CategoriesComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    onViewCategory() {
        this.router.navigate(['menu-page']);
    }
}
CategoriesComponent.ɵfac = function CategoriesComponent_Factory(t) { return new (t || CategoriesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
CategoriesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CategoriesComponent, selectors: [["app-categories"]], decls: 39, vars: 0, consts: [[1, "categories-outer"], [1, "container", 2, "text-align", "center"], ["id", "text-1", 1, "col-lg-6", "mx-auto"], [1, "display-6"], [1, "text-center", 2, "margin-bottom", "60px", "margin-top", "60px"], ["type", "button", 1, "btn", "btn-md", "btn-outline-dark", 3, "click"], [1, "row", "row-cols-1", "row-cols-md-2", "row-cols-lg-2", "row-cols-xl-4"], [1, "col"], [1, "card"], ["src", "https://firebasestorage.googleapis.com/v0/b/restaurant-21-club.appspot.com/o/starter.jpg?alt=media&token=2b0a42ab-d931-4421-9c5c-684a2ecb95e1", "alt", "...", 1, "card-img-top"], [1, "card-body"], [1, "card-title"], ["src", "https://firebasestorage.googleapis.com/v0/b/restaurant-21-club.appspot.com/o/mains.jpg?alt=media&token=bbf302db-447f-4c7e-9467-3741af3010d9", "alt", "...", 1, "card-img-top"], ["src", "https://firebasestorage.googleapis.com/v0/b/restaurant-21-club.appspot.com/o/dessert.jpg?alt=media&token=e8edc62c-da39-4f56-ae8f-94c372a1f3c2", "alt", "...", 1, "card-img-top"], ["src", "https://firebasestorage.googleapis.com/v0/b/restaurant-21-club.appspot.com/o/alcohol.jpg?alt=media&token=40c06c97-283f-46b6-a843-36d4d93154c6", "alt", "...", 1, "card-img-top"]], template: function CategoriesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Want to get food delivered to you? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " Place your order now. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CategoriesComponent_Template_button_click_8_listener() { return ctx.onViewCategory(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Have a look at what we've for you");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "img", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "h5", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Starters");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h5", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Mains");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "img", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "h5", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Desserts");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "img", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "h5", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38, "Alcoholic beverages");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".categories-outer[_ngcontent-%COMP%] {\r\n    max-width: 100%;\r\n    background-color: rgb(250, 250, 250);\r\n    padding-top: 52px;\r\n    padding-bottom: 52px;\r\n}\r\n\r\n#text-1[_ngcontent-%COMP%] {\r\n    margin-bottom: 30px;\r\n}\r\n\r\n.lead[_ngcontent-%COMP%] {\r\n    font-weight: 400;\r\n    color: rgb(41, 41, 41);\r\n    font-size: 30px;\r\n}\r\n\r\na.clickable-card[_ngcontent-%COMP%], a.clickable-card[_ngcontent-%COMP%]:hover {\r\n    color: inherit;\r\n    text-decoration: none;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    border-top-right-radius: 2em;\r\n    border-bottom-left-radius: 2em;\r\n}\r\n\r\n.card-img-top[_ngcontent-%COMP%] {\r\n    border-radius: 2em;\r\n    border-bottom-right-radius: 0em;\r\n    border-top-left-radius: 0em;\r\n    border-bottom-left-radius: 0em;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n@media (min-width: 1281px) {\r\n    .card-img-top[_ngcontent-%COMP%] {\r\n        width: 100%;\r\n        height: 15vw;\r\n        object-fit: cover;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 1025px) and (max-width: 1280px) {\r\n    div.card[_ngcontent-%COMP%] {\r\n        margin: 0 auto;\r\n        float: none;\r\n        margin-bottom: 40px;\r\n        width: 90%\r\n    }\r\n    .card-img-top[_ngcontent-%COMP%] {\r\n        width: 100%;\r\n        height: 15vw;\r\n        object-fit: cover;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) {\r\n    div.card[_ngcontent-%COMP%] {\r\n        margin: 0 auto;\r\n        float: none;\r\n        margin-bottom: 40px;\r\n        width: 90%\r\n    }\r\n    .card-img-top[_ngcontent-%COMP%] {\r\n        width: 100%;\r\n        height: 25vw;\r\n        object-fit: cover;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {\r\n    div.card[_ngcontent-%COMP%] {\r\n        width: 80%;\r\n        margin: 0 auto;\r\n        float: none;\r\n        margin-bottom: 40px;\r\n    }\r\n    div.card-img-top[_ngcontent-%COMP%] {\r\n        height: 25vw;\r\n        object-fit: cover;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    div.card[_ngcontent-%COMP%] {\r\n        width: 80%;\r\n        margin: 0 auto;\r\n        float: none;\r\n        margin-bottom: 40px;\r\n    }\r\n    div.card-img-top[_ngcontent-%COMP%] {\r\n        height: 25vw;\r\n        object-fit: cover;\r\n    }\r\n    .lead[_ngcontent-%COMP%] {\r\n        font-size: 22px;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    div.card[_ngcontent-%COMP%] {\r\n        width: 80%;\r\n        margin: 0 auto;\r\n        float: none;\r\n        margin-bottom: 40px;\r\n    }\r\n    div.card-img-top[_ngcontent-%COMP%] {\r\n        height: 25vw;\r\n        object-fit: cover;\r\n    }\r\n    .lead[_ngcontent-%COMP%] {\r\n        font-size: 22px;\r\n        margin-left: 20px;\r\n        margin-right: 20px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhdGVnb3JpZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGVBQWU7SUFDZixvQ0FBb0M7SUFDcEMsaUJBQWlCO0lBQ2pCLG9CQUFvQjtBQUN4Qjs7QUFFQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQixzQkFBc0I7SUFDdEIsZUFBZTtBQUNuQjs7QUFFQTs7SUFFSSxjQUFjO0lBQ2QscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksNEJBQTRCO0lBQzVCLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQiwrQkFBK0I7SUFDL0IsMkJBQTJCO0lBQzNCLDhCQUE4QjtBQUNsQzs7QUFHQTs7R0FFRzs7QUFHSDs7O0NBR0M7O0FBRUQ7SUFDSTtRQUNJLFdBQVc7UUFDWCxZQUFZO1FBQ1osaUJBQWlCO0lBQ3JCO0FBQ0o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0k7UUFDSSxjQUFjO1FBQ2QsV0FBVztRQUNYLG1CQUFtQjtRQUNuQjtJQUNKO0lBQ0E7UUFDSSxXQUFXO1FBQ1gsWUFBWTtRQUNaLGlCQUFpQjtJQUNyQjtBQUNKOztBQUdBOzs7R0FHRzs7QUFFSDtJQUNJO1FBQ0ksY0FBYztRQUNkLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkI7SUFDSjtJQUNBO1FBQ0ksV0FBVztRQUNYLFlBQVk7UUFDWixpQkFBaUI7SUFDckI7QUFDSjs7QUFHQTs7O0dBR0c7O0FBRUg7SUFDSTtRQUNJLFVBQVU7UUFDVixjQUFjO1FBQ2QsV0FBVztRQUNYLG1CQUFtQjtJQUN2QjtJQUNBO1FBQ0ksWUFBWTtRQUNaLGlCQUFpQjtJQUNyQjtBQUNKOztBQUdBOzs7R0FHRzs7QUFFSDtJQUNJO1FBQ0ksVUFBVTtRQUNWLGNBQWM7UUFDZCxXQUFXO1FBQ1gsbUJBQW1CO0lBQ3ZCO0lBQ0E7UUFDSSxZQUFZO1FBQ1osaUJBQWlCO0lBQ3JCO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0FBQ0o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0k7UUFDSSxVQUFVO1FBQ1YsY0FBYztRQUNkLFdBQVc7UUFDWCxtQkFBbUI7SUFDdkI7SUFDQTtRQUNJLFlBQVk7UUFDWixpQkFBaUI7SUFDckI7SUFDQTtRQUNJLGVBQWU7UUFDZixpQkFBaUI7UUFDakIsa0JBQWtCO0lBQ3RCO0FBQ0oiLCJmaWxlIjoiY2F0ZWdvcmllcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhdGVnb3JpZXMtb3V0ZXIge1xyXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1MCwgMjUwLCAyNTApO1xyXG4gICAgcGFkZGluZy10b3A6IDUycHg7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogNTJweDtcclxufVxyXG5cclxuI3RleHQtMSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG59XHJcblxyXG4ubGVhZCB7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgY29sb3I6IHJnYig0MSwgNDEsIDQxKTtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxufVxyXG5cclxuYS5jbGlja2FibGUtY2FyZCxcclxuYS5jbGlja2FibGUtY2FyZDpob3ZlciB7XHJcbiAgICBjb2xvcjogaW5oZXJpdDtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDJlbTtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDJlbTtcclxufVxyXG5cclxuLmNhcmQtaW1nLXRvcCB7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyZW07XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMGVtO1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMGVtO1xyXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMGVtO1xyXG59XHJcblxyXG5cclxuLyogZGl2LmNhcmQ6aG92ZXIge1xyXG4gICAgYm94LXNoYWRvdzogcmdiYSg1MCwgNTAsIDkzLCAwLjI1KSAwcHggMTNweCAyN3B4IC01cHgsIHJnYmEoMCwgMCwgMCwgMC4zKSAwcHggOHB4IDE2cHggLThweDtcclxufSAqL1xyXG5cclxuXHJcbi8qIFxyXG4gICMjRGV2aWNlID0gRGVza3RvcHNcclxuICAjI1NjcmVlbiA9IDEyODFweCB0byBoaWdoZXIgcmVzb2x1dGlvbiBkZXNrdG9wc1xyXG4qL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDEyODFweCkge1xyXG4gICAgLmNhcmQtaW1nLXRvcCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxNXZ3O1xyXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IExhcHRvcHMsIERlc2t0b3BzXHJcbiAgICAjI1NjcmVlbiA9IEIvdyAxMDI1cHggdG8gMTI4MHB4XHJcbiAgKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIGFuZCAobWF4LXdpZHRoOiAxMjgwcHgpIHtcclxuICAgIGRpdi5jYXJkIHtcclxuICAgICAgICBtYXJnaW46IDAgYXV0bztcclxuICAgICAgICBmbG9hdDogbm9uZTtcclxuICAgICAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xyXG4gICAgICAgIHdpZHRoOiA5MCVcclxuICAgIH1cclxuICAgIC5jYXJkLWltZy10b3Age1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIGhlaWdodDogMTV2dztcclxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBUYWJsZXRzLCBJcGFkcyAocG9ydHJhaXQpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA3NjhweCB0byAxMDI0cHhcclxuICAqL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgICBkaXYuY2FyZCB7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgZmxvYXQ6IG5vbmU7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgICAgICB3aWR0aDogOTAlXHJcbiAgICB9XHJcbiAgICAuY2FyZC1pbWctdG9wIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDI1dnc7XHJcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICAgICMjRGV2aWNlID0gVGFibGV0cywgSXBhZHMgKGxhbmRzY2FwZSlcclxuICAgICMjU2NyZWVuID0gQi93IDc2OHB4IHRvIDEwMjRweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIGFuZCAob3JpZW50YXRpb246IGxhbmRzY2FwZSkge1xyXG4gICAgZGl2LmNhcmQge1xyXG4gICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgZmxvYXQ6IG5vbmU7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIH1cclxuICAgIGRpdi5jYXJkLWltZy10b3Age1xyXG4gICAgICAgIGhlaWdodDogMjV2dztcclxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBMb3cgUmVzb2x1dGlvbiBUYWJsZXRzLCBNb2JpbGVzIChMYW5kc2NhcGUpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA0ODFweCB0byA3NjdweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNDgxcHgpIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xyXG4gICAgZGl2LmNhcmQge1xyXG4gICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgZmxvYXQ6IG5vbmU7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIH1cclxuICAgIGRpdi5jYXJkLWltZy10b3Age1xyXG4gICAgICAgIGhlaWdodDogMjV2dztcclxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIH1cclxuICAgIC5sZWFkIHtcclxuICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICAgICMjRGV2aWNlID0gTW9zdCBvZiB0aGUgU21hcnRwaG9uZXMgTW9iaWxlcyAoUG9ydHJhaXQpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyAzMjBweCB0byA0NzlweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogMzIwcHgpIGFuZCAobWF4LXdpZHRoOiA0ODBweCkge1xyXG4gICAgZGl2LmNhcmQge1xyXG4gICAgICAgIHdpZHRoOiA4MCU7XHJcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XHJcbiAgICAgICAgZmxvYXQ6IG5vbmU7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcclxuICAgIH1cclxuICAgIGRpdi5jYXJkLWltZy10b3Age1xyXG4gICAgICAgIGhlaWdodDogMjV2dztcclxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICAgIH1cclxuICAgIC5sZWFkIHtcclxuICAgICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ }),

/***/ "Xc5M":
/*!*************************************************************!*\
  !*** ./src/app/home/header-image/header-image.component.ts ***!
  \*************************************************************/
/*! exports provided: HeaderImageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderImageComponent", function() { return HeaderImageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_fetch_header_image_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/fetch-header-image.service */ "wW1b");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../global/loader/loader.component */ "yPJz");




function HeaderImageComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-loader");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class HeaderImageComponent {
    constructor(fetchImgService) {
        this.fetchImgService = fetchImgService;
        this.isFetchingImage = false;
    }
    ngOnInit() {
        this.isFetchingImage = true;
        this.fetchImgService.fetchImage().subscribe((response) => {
            //console.log(response);
        }, (error) => {
            this.imageUrl = error.url;
            this.isFetchingImage = false;
        });
    }
}
HeaderImageComponent.ɵfac = function HeaderImageComponent_Factory(t) { return new (t || HeaderImageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_fetch_header_image_service__WEBPACK_IMPORTED_MODULE_1__["FetchHeaderImageService"])); };
HeaderImageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderImageComponent, selectors: [["app-header-image"]], decls: 3, vars: 2, consts: [["style", "margin-top: 150px; margin-bottom: 150px;", 4, "ngIf"], ["id", "header-image-div", 1, "container-lg", 2, "text-align", "center"], ["alt", "", "id", "header-image", 1, "img-fluid", 3, "src"], [2, "margin-top", "150px", "margin-bottom", "150px"]], template: function HeaderImageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, HeaderImageComponent_div_0_Template, 2, 0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isFetchingImage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_3__["LoaderComponent"]], styles: ["#header-image-div[_ngcontent-%COMP%] {\r\n    margin-top: 60px;\r\n    padding-right: 0px;\r\n    padding-left: 0px;\r\n}\r\n\r\n#header-image[_ngcontent-%COMP%] {}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci1pbWFnZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksZ0JBQWdCO0lBQ2hCLGtCQUFrQjtJQUNsQixpQkFBaUI7QUFDckI7O0FBRUEsZUFBZSIsImZpbGUiOiJoZWFkZXItaW1hZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNoZWFkZXItaW1hZ2UtZGl2IHtcclxuICAgIG1hcmdpbi10b3A6IDYwcHg7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAwcHg7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDBweDtcclxufVxyXG5cclxuI2hlYWRlci1pbWFnZSB7fSJdfQ== */"] });


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _global_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./global/navbar/navbar.component */ "0Gr/");
/* harmony import */ var _home_header_image_header_image_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/header-image/header-image.component */ "Xc5M");
/* harmony import */ var _home_categories_categories_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/categories/categories.component */ "UvY/");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./global/loader/loader.component */ "yPJz");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/login/login.component */ "bsvf");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./auth/signup/signup.component */ "SBxm");
/* harmony import */ var _global_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./global/footer/footer.component */ "HNvH");
/* harmony import */ var _cart_cart_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cart/cart.component */ "c2A7");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/fire */ "spgP");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");
/* harmony import */ var _angular_fire_storage__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/fire/storage */ "Vaw3");
/* harmony import */ var _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/fire/analytics */ "h+eY");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _cart_page_cart_page_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./cart-page/cart-page.component */ "/xLE");
/* harmony import */ var _category_page_category_page_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./category-page/category-page.component */ "PnL/");
/* harmony import */ var _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./user-profile/user-profile.component */ "/de2");
/* harmony import */ var _admin_add_or_edit_items_add_or_edit_items_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./admin/add-or-edit-items/add-or-edit-items.component */ "J0Of");
/* harmony import */ var _admin_display_items_display_items_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./admin/display-items/display-items.component */ "raWv");
/* harmony import */ var _global_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./global/not-found/not-found.component */ "fEtg");
/* harmony import */ var _global_starters_icon_starters_icon_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./global/starters-icon/starters-icon.component */ "iKEw");
/* harmony import */ var _global_mains_icon_mains_icon_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./global/mains-icon/mains-icon.component */ "ygTu");
/* harmony import */ var _global_drinks_icon_drinks_icon_component__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./global/drinks-icon/drinks-icon.component */ "dVxj");
/* harmony import */ var _global_desserts_icon_desserts_icon_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./global/desserts-icon/desserts-icon.component */ "6JSh");
/* harmony import */ var _global_cart_icon_cart_icon_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./global/cart-icon/cart-icon.component */ "LCe4");
/* harmony import */ var _order_page_order_page_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./order-page/order-page.component */ "rTIa");
/* harmony import */ var _route_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./route-guards/auth-guard.service */ "Li/Y");
/* harmony import */ var _confirm_order_confirm_order_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./confirm-order/confirm-order.component */ "mArq");
/* harmony import */ var _admin_manage_orders_manage_orders_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./admin/manage-orders/manage-orders.component */ "8YET");
/* harmony import */ var _admin_display_orders_display_orders_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./admin/display-orders/display-orders.component */ "4hB0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/core */ "fXoL");






































class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_36__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_36__["ɵɵdefineInjector"]({ providers: [_route_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_32__["AuthGuard"]], imports: [[
            _angular_fire__WEBPACK_IMPORTED_MODULE_14__["AngularFireModule"].initializeApp(src_environments_environment__WEBPACK_IMPORTED_MODULE_19__["environment"].firebase),
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_15__["AngularFireAuthModule"],
            _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_16__["AngularFirestoreModule"],
            _angular_fire_storage__WEBPACK_IMPORTED_MODULE_17__["AngularFireStorageModule"],
            _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_18__["AngularFireAnalyticsModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_36__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
        _global_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_5__["NavbarComponent"],
        _home_header_image_header_image_component__WEBPACK_IMPORTED_MODULE_6__["HeaderImageComponent"],
        _home_categories_categories_component__WEBPACK_IMPORTED_MODULE_7__["CategoriesComponent"],
        _home_home_component__WEBPACK_IMPORTED_MODULE_8__["HomeComponent"],
        _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_9__["LoaderComponent"],
        _auth_login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
        _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_11__["SignupComponent"],
        _global_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__["FooterComponent"],
        _cart_cart_component__WEBPACK_IMPORTED_MODULE_13__["CartComponent"],
        _cart_page_cart_page_component__WEBPACK_IMPORTED_MODULE_20__["CartPageComponent"],
        _category_page_category_page_component__WEBPACK_IMPORTED_MODULE_21__["CategoryPageComponent"],
        _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_22__["UserProfileComponent"],
        _admin_add_or_edit_items_add_or_edit_items_component__WEBPACK_IMPORTED_MODULE_23__["AddOrEditItemsComponent"],
        _admin_display_items_display_items_component__WEBPACK_IMPORTED_MODULE_24__["DisplayItemsComponent"],
        _global_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_25__["NotFoundComponent"],
        _global_starters_icon_starters_icon_component__WEBPACK_IMPORTED_MODULE_26__["StartersIconComponent"],
        _global_mains_icon_mains_icon_component__WEBPACK_IMPORTED_MODULE_27__["MainsIconComponent"],
        _global_drinks_icon_drinks_icon_component__WEBPACK_IMPORTED_MODULE_28__["DrinksIconComponent"],
        _global_desserts_icon_desserts_icon_component__WEBPACK_IMPORTED_MODULE_29__["DessertsIconComponent"],
        _global_cart_icon_cart_icon_component__WEBPACK_IMPORTED_MODULE_30__["CartIconComponent"],
        _order_page_order_page_component__WEBPACK_IMPORTED_MODULE_31__["OrderPageComponent"],
        _confirm_order_confirm_order_component__WEBPACK_IMPORTED_MODULE_33__["ConfirmOrderComponent"],
        _admin_manage_orders_manage_orders_component__WEBPACK_IMPORTED_MODULE_34__["ManageOrdersComponent"],
        _admin_display_orders_display_orders_component__WEBPACK_IMPORTED_MODULE_35__["DisplayOrdersComponent"]], imports: [_angular_fire__WEBPACK_IMPORTED_MODULE_14__["AngularFireModule"], _angular_fire_auth__WEBPACK_IMPORTED_MODULE_15__["AngularFireAuthModule"],
        _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_16__["AngularFirestoreModule"],
        _angular_fire_storage__WEBPACK_IMPORTED_MODULE_17__["AngularFireStorageModule"],
        _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_18__["AngularFireAnalyticsModule"],
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ReactiveFormsModule"]] }); })();


/***/ }),

/***/ "bsvf":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_auth_error_handler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/auth-error-handler.service */ "Tb8I");
/* harmony import */ var src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/user-data.service */ "DPk/");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function LoginComponent_span_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Please enter a valid email.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function LoginComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1.errorObj.logIn.email);
} }
function LoginComponent_span_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Password length must be greater than 8.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function LoginComponent_span_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r3.errorObj.logIn.password);
} }
function LoginComponent_i_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "i", 21);
} }
function LoginComponent_span_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "span", 22);
} }
function LoginComponent_span_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r6.errorObj.logIn.unknown);
} }
const _c0 = function (a0) { return { "error-border": a0 }; };
const _c1 = function () { return ["/sign-up"]; };
class LoginComponent {
    constructor(authService, router, authErrorHandler, userDataService) {
        this.authService = authService;
        this.router = router;
        this.authErrorHandler = authErrorHandler;
        this.userDataService = userDataService;
        this.isLoggingIn = false;
        this.isBtnClicked = false;
        this.isHideResponseErrors = true;
        // creating a subscription to listen to the subject in authService
        // so that we get updated whenever the errorObj changes
        this.errorSub = authErrorHandler.getErrorObservable().subscribe((data) => {
            this.errorObj = data;
        });
        // the errorObj needs to be initialized here
        // calls the next method on subject in authService
        // and we get the initial errorObj data here
        this.authErrorHandler.initializeErrorObj();
    }
    ngOnInit() {
        // creating reactive signup form
        this.logInForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].email]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"].minLength(8),
            ]),
        });
        // reset the errorObj
        // so that previous errors don't come up in view 
        this.errorObj = {
            logIn: {
                errorFound: null,
                email: null,
                password: null,
                unknown: null,
            },
            signUp: {
                errorFound: null,
                name: null,
                email: null,
                password: null,
                unknown: null,
            },
        };
    }
    ngOnDestroy() {
        this.errorSub.unsubscribe();
    }
    /** method binded to form ngSubmit event */
    onLogIn() {
        // handle the case when disabled attribute for submit button is deleted
        // from html
        if (this.logInForm.invalid) {
            return;
        }
        this.isBtnClicked = true;
        this.isLoggingIn = true;
        this.email = this.logInForm.get('email').value;
        this.password = this.logInForm.get('password').value;
        this.authService
            .signIn(this.email, this.password)
            .then((result) => {
            this.isLoggingIn = false;
            this.isHideResponseErrors = true;
            this.router.navigate(['']);
        })
            .catch((error) => {
            this.isBtnClicked = false;
            this.isHideResponseErrors = false;
            this.isLoggingIn = false;
            this.authErrorHandler.handleAuthError(error, 'logIn');
        });
    }
    /** on clicking log in with google */
    onLogInWithGoogle() {
        this.authService
            .authenticateWithGoogle()
            .then((result) => {
            // save user data for a first time user only
            if (result.additionalUserInfo.isNewUser == true) {
                this.userDataService.createNewUser(result.user.displayName, result.user.email, result.user.uid);
            }
            this.router.navigate(['']);
        })
            .catch((error) => {
            console.log(error);
            this.authErrorHandler.handleAuthError(error, 'logIn');
        });
    }
    /** hides error messages on input click */
    hideResponseErrors() {
        if (this.authErrorHandler.foundLogInError &&
            this.isHideResponseErrors === false) {
            this.isHideResponseErrors = !this.isHideResponseErrors;
            this.authErrorHandler.clearLogInError();
        }
    }
}
LoginComponent.ɵfac = function LoginComponent_Factory(t) { return new (t || LoginComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_auth_error_handler_service__WEBPACK_IMPORTED_MODULE_4__["AuthErrorHandlerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_user_data_service__WEBPACK_IMPORTED_MODULE_5__["UserDataService"])); };
LoginComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LoginComponent, selectors: [["app-login"]], decls: 28, vars: 17, consts: [[1, "form-signin"], [1, "h3", "mb-3", "fw-normal"], [3, "formGroup", "ngSubmit"], [3, "click"], [1, "form-floating"], ["type", "email", "id", "floatingInput", "placeholder", "name@example.com", "formControlName", "email", 1, "form-control", 3, "ngClass"], ["for", "floatingInput", 1, "floating-label"], ["class", "error-text", 4, "ngIf"], ["type", "password", "id", "floatingPassword", "placeholder", "Password", "formControlName", "password", 1, "form-control", 3, "ngClass"], ["for", "floatingPassword", 1, "floating-label"], ["class", "error-text", "style", "margin-top: -100px;", 4, "ngIf"], ["type", "submit", 1, "w-100", "btn", "btn-lg", "btn-primary", 2, "margin-top", "10px", 3, "disabled"], ["class", "fa fa-arrow-right", 4, "ngIf"], ["class", "spinner-border spinner-border-sm", "role", "status", "aria-hidden", "true", 4, "ngIf"], ["type", "button", 1, "w-100", "btn", "btn-lg", "btn-primary", "google-btn", 2, "margin-bottom", "25px", 3, "click"], [1, "google-btn-text"], ["class", "unknown-error-text", 4, "ngIf"], [1, "mobile-only"], [3, "routerLink"], [1, "error-text"], [1, "error-text", 2, "margin-top", "-100px"], [1, "fa", "fa-arrow-right"], ["role", "status", "aria-hidden", "true", 1, "spinner-border", "spinner-border-sm"], [1, "unknown-error-text"]], template: function LoginComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Log in");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_3_listener() { return ctx.onLogIn(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_div_click_4_listener() { return ctx.hideResponseErrors(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Email address");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, LoginComponent_span_9_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, LoginComponent_span_10_Template, 2, 1, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "Password");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, LoginComponent_span_15_Template, 2, 0, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, LoginComponent_span_16_Template, 2, 1, "span", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, LoginComponent_i_18_Template, 1, 0, "i", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, LoginComponent_span_19_Template, 1, 0, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_20_listener() { return ctx.onLogInWithGoogle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "span", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Log in with Google");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, LoginComponent_span_23_Template, 2, 1, "span", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "p", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25, "Don't have an account? ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Sign up");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.logInForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](12, _c0, !ctx.isHideResponseErrors && ctx.errorObj.logIn.email != null));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.logInForm.controls.email.errors != null && ctx.logInForm.controls.email.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isHideResponseErrors && ctx.errorObj.logIn.email != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](14, _c0, !ctx.isHideResponseErrors && ctx.errorObj.logIn.password != null));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.logInForm.controls.password.errors != null && ctx.logInForm.controls.password.touched);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isHideResponseErrors && ctx.errorObj.logIn.password != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx.logInForm.valid || ctx.isBtnClicked);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isLoggingIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoggingIn);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.errorObj.logIn.unknown != null);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](16, _c1));
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_0__["ɵangular_packages_forms_forms_ba"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroupDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormControlName"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterLinkWithHref"]], styles: [".form-signin[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    max-width: 330px;\r\n    margin: auto;\r\n    padding-top: 150px;\r\n    padding-bottom: 180px;\r\n    min-height: 70vh;\r\n}\r\n\r\n.floating-label[_ngcontent-%COMP%] {\r\n    color: rgb(109, 109, 109)\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   .checkbox[_ngcontent-%COMP%] {\r\n    font-weight: 400;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   .form-floating[_ngcontent-%COMP%]:focus-within {\r\n    z-index: 2;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"email\"][_ngcontent-%COMP%] {\r\n    margin-bottom: -1px;\r\n    border-bottom-right-radius: 0;\r\n    border-bottom-left-radius: 0;\r\n}\r\n\r\n.form-signin[_ngcontent-%COMP%]   input[type=\"password\"][_ngcontent-%COMP%] {\r\n    margin-bottom: 1px;\r\n    border-top-left-radius: 0;\r\n    border-top-right-radius: 0;\r\n}\r\n\r\nbutton[type=\"submit\"][_ngcontent-%COMP%]:disabled {\r\n    background-color: rgb(173, 173, 173);\r\n    border-color: inherit;\r\n}\r\n\r\ninput[type=\"email\"].ng-invalid.ng-touched[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n}\r\n\r\ninput[type=\"password\"].ng-invalid.ng-touched[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n    margin-bottom: -1px;\r\n}\r\n\r\n.error-text[_ngcontent-%COMP%] {\r\n    color: rgb(255, 83, 83);\r\n    font-size: 13px;\r\n    margin-left: 13px;\r\n}\r\n\r\n.unknown-error-text[_ngcontent-%COMP%] {\r\n    color: rgb(255, 83, 83);\r\n    font-size: 13px;\r\n    margin-top: 10px;\r\n}\r\n\r\n.error-border[_ngcontent-%COMP%] {\r\n    border: 1px solid rgb(255, 83, 83);\r\n}\r\n\r\n.google-btn[_ngcontent-%COMP%] {\r\n    margin-top: 10px;\r\n}\r\n\r\n.google-btn-text[_ngcontent-%COMP%] {\r\n    font-size: 16px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxXQUFXO0lBQ1gsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixrQkFBa0I7SUFDbEIscUJBQXFCO0lBQ3JCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJO0FBQ0o7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsNkJBQTZCO0lBQzdCLDRCQUE0QjtBQUNoQzs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQix5QkFBeUI7SUFDekIsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksb0NBQW9DO0lBQ3BDLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGtDQUFrQztBQUN0Qzs7QUFFQTtJQUNJLGtDQUFrQztJQUNsQyxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsZUFBZTtJQUNmLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixlQUFlO0lBQ2YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksa0NBQWtDO0FBQ3RDOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQiIsImZpbGUiOiJsb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvcm0tc2lnbmluIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgbWF4LXdpZHRoOiAzMzBweDtcclxuICAgIG1hcmdpbjogYXV0bztcclxuICAgIHBhZGRpbmctdG9wOiAxNTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxODBweDtcclxuICAgIG1pbi1oZWlnaHQ6IDcwdmg7XHJcbn1cclxuXHJcbi5mbG9hdGluZy1sYWJlbCB7XHJcbiAgICBjb2xvcjogcmdiKDEwOSwgMTA5LCAxMDkpXHJcbn1cclxuXHJcbi5mb3JtLXNpZ25pbiAuY2hlY2tib3gge1xyXG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcclxufVxyXG5cclxuLmZvcm0tc2lnbmluIC5mb3JtLWZsb2F0aW5nOmZvY3VzLXdpdGhpbiB7XHJcbiAgICB6LWluZGV4OiAyO1xyXG59XHJcblxyXG4uZm9ybS1zaWduaW4gaW5wdXRbdHlwZT1cImVtYWlsXCJdIHtcclxuICAgIG1hcmdpbi1ib3R0b206IC0xcHg7XHJcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcclxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XHJcbn1cclxuXHJcbi5mb3JtLXNpZ25pbiBpbnB1dFt0eXBlPVwicGFzc3dvcmRcIl0ge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXB4O1xyXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMDtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAwO1xyXG59XHJcblxyXG5idXR0b25bdHlwZT1cInN1Ym1pdFwiXTpkaXNhYmxlZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTczLCAxNzMsIDE3Myk7XHJcbiAgICBib3JkZXItY29sb3I6IGluaGVyaXQ7XHJcbn1cclxuXHJcbmlucHV0W3R5cGU9XCJlbWFpbFwiXS5uZy1pbnZhbGlkLm5nLXRvdWNoZWQge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgODMsIDgzKTtcclxufVxyXG5cclxuaW5wdXRbdHlwZT1cInBhc3N3b3JkXCJdLm5nLWludmFsaWQubmctdG91Y2hlZCB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMjU1LCA4MywgODMpO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogLTFweDtcclxufVxyXG5cclxuLmVycm9yLXRleHQge1xyXG4gICAgY29sb3I6IHJnYigyNTUsIDgzLCA4Myk7XHJcbiAgICBmb250LXNpemU6IDEzcHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTNweDtcclxufVxyXG5cclxuLnVua25vd24tZXJyb3ItdGV4dCB7XHJcbiAgICBjb2xvcjogcmdiKDI1NSwgODMsIDgzKTtcclxuICAgIGZvbnQtc2l6ZTogMTNweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5lcnJvci1ib3JkZXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDI1NSwgODMsIDgzKTtcclxufVxyXG5cclxuLmdvb2dsZS1idG4ge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLmdvb2dsZS1idG4tdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbn0iXX0= */"] });


/***/ }),

/***/ "c2A7":
/*!****************************************!*\
  !*** ./src/app/cart/cart.component.ts ***!
  \****************************************/
/*! exports provided: CartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CartComponent", function() { return CartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_handle_cart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/handle-cart.service */ "PqqQ");
/* harmony import */ var _services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");





function CartComponent_nav_0_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CartComponent_nav_0_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r3.onContinue(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Continue");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function CartComponent_nav_0_button_8_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CartComponent_nav_0_button_8_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r5.placeOrder(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Place order");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function CartComponent_nav_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, CartComponent_nav_0_button_7_Template, 2, 0, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, CartComponent_nav_0_button_8_Template, 2, 0, "button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Cart (", ctx_r0.totalItems, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Subtotal: \u20B9", ctx_r0.totalAmt, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.goToOrders == false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.goToOrders == true);
} }
class CartComponent {
    constructor(handleCartService, handleLocalStorage, router, route) {
        this.handleCartService = handleCartService;
        this.handleLocalStorage = handleLocalStorage;
        this.router = router;
        this.route = route;
        this.isCartEmpty = true;
        this.goToOrders = false;
        this.hideCartBar = false;
        this.handleLocalStorage.getCartDataObservable().subscribe((data) => {
            // here data is cart data object
            if (data != null && Object.keys(data.items).length > 0) {
                this.isCartEmpty = false;
                this.totalAmt = data.totalAmt;
                this.totalItems = Object.keys(data.items).length;
            }
            if (data == null) {
                this.isCartEmpty = true;
            }
        });
    }
    ngOnInit() {
        this.handleCartService.onCartPageObs().subscribe((data) => {
            this.goToOrders = data;
        });
        this.handleCartService.onConfirmOrderPageObs().subscribe((data) => {
            this.hideCartBar = data;
        });
    }
    onContinue() {
        this.router.navigate(['cart']);
    }
    placeOrder() {
        this.router.navigate(['confirm-order']);
    }
}
CartComponent.ɵfac = function CartComponent_Factory(t) { return new (t || CartComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_handle_cart_service__WEBPACK_IMPORTED_MODULE_1__["HandleCartService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["HandleLocalStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"])); };
CartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CartComponent, selectors: [["app-cart"]], decls: 1, vars: 1, consts: [["class", "navbar fixed-bottom navbar-expand-lg", "id", "cart-bar", 4, "ngIf"], ["id", "cart-bar", 1, "navbar", "fixed-bottom", "navbar-expand-lg"], ["id", "cart-bar-div ", 1, "container"], [1, "navbar-brand"], ["id", "subtotal"], ["type", "button", "class", "btn btn-outline-danger", "id", "view-cart-btn", 3, "click", 4, "ngIf"], ["type", "button", "class", "btn btn-outline-success", "id", "view-cart-btn", 3, "click", 4, "ngIf"], ["type", "button", "id", "view-cart-btn", 1, "btn", "btn-outline-danger", 3, "click"], ["type", "button", "id", "view-cart-btn", 1, "btn", "btn-outline-success", 3, "click"]], template: function CartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CartComponent_nav_0_Template, 9, 4, "nav", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isCartEmpty == false && ctx.hideCartBar == false);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], styles: ["#subtotal[_ngcontent-%COMP%] {\r\n    padding-right: 11px;\r\n}\r\n\r\n#clear-cart-btn[_ngcontent-%COMP%] {\r\n    margin-right: 6px;\r\n}\r\n\r\n#cart-bar[_ngcontent-%COMP%] {\r\n    background-color: white;\r\n    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;\r\n    color: black;\r\n    \r\n    position: sticky;\r\n    font-family: \"Karla\", sans-serif;\r\n    font-size: 20px;\r\n}\r\n\r\n\r\n\r\n@media (min-width: 1281px) {\r\n    \r\n}\r\n\r\n\r\n\r\n@media (min-width: 1025px) and (max-width: 1280px) {\r\n    \r\n}\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) {\r\n    \r\n}\r\n\r\n\r\n\r\n@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {\r\n    \r\n}\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    .navbar-brand[_ngcontent-%COMP%] {\r\n        font-size: 17px;\r\n    }\r\n    #subtotal[_ngcontent-%COMP%] {\r\n        font-size: 16px;\r\n    }\r\n    #cart-bar-div[_ngcontent-%COMP%] {\r\n        font-size: 14px;\r\n    }\r\n    #clear-cart-btn[_ngcontent-%COMP%] {\r\n        font-size: 14px;\r\n    }\r\n    #view-cart-btn[_ngcontent-%COMP%] {\r\n        font-size: 15px;\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    .navbar-brand[_ngcontent-%COMP%] {\r\n        font-size: 17px;\r\n    }\r\n    #subtotal[_ngcontent-%COMP%] {\r\n        font-size: 16px;\r\n    }\r\n    #cart-bar-div[_ngcontent-%COMP%] {\r\n        font-size: 14px;\r\n    }\r\n    #clear-cart-btn[_ngcontent-%COMP%] {\r\n        font-size: 14px;\r\n    }\r\n    #view-cart-btn[_ngcontent-%COMP%] {\r\n        font-size: 15px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcnQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2Qix1TEFBdUw7SUFDdkwsWUFBWTtJQUNaLHNGQUFzRjtJQUN0RixnQkFBZ0I7SUFDaEIsZ0NBQWdDO0lBQ2hDLGVBQWU7QUFDbkI7O0FBR0E7OztDQUdDOztBQUVEO0lBQ0ksUUFBUTtBQUNaOztBQUdBOzs7R0FHRzs7QUFFSDtJQUNJLFFBQVE7QUFDWjs7QUFHQTs7O0dBR0c7O0FBRUg7SUFDSSxRQUFRO0FBQ1o7O0FBR0E7OztHQUdHOztBQUVIO0lBQ0ksUUFBUTtBQUNaOztBQUdBOzs7R0FHRzs7QUFFSDtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtBQUNKOztBQUdBOzs7R0FHRzs7QUFFSDtJQUNJO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtJQUNBO1FBQ0ksZUFBZTtJQUNuQjtBQUNKIiwiZmlsZSI6ImNhcnQuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNzdWJ0b3RhbCB7XHJcbiAgICBwYWRkaW5nLXJpZ2h0OiAxMXB4O1xyXG59XHJcblxyXG4jY2xlYXItY2FydC1idG4ge1xyXG4gICAgbWFyZ2luLXJpZ2h0OiA2cHg7XHJcbn1cclxuXHJcbiNjYXJ0LWJhciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yNSkgMHB4IDU0cHggNTVweCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggLTEycHggMzBweCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggNHB4IDZweCwgcmdiYSgwLCAwLCAwLCAwLjE3KSAwcHggMTJweCAxM3B4LCByZ2JhKDAsIDAsIDAsIDAuMDkpIDBweCAtM3B4IDVweDtcclxuICAgIGNvbG9yOiBibGFjaztcclxuICAgIC8qKiBiZWxvdyBjc3MgaXMgdG8gbWFrZSBjYXJ0IGJhciBzdGlja3kgYW5kIGFsd2F5cyBvbiB0b3Agd2l0aG91dCBvYnN0cnVjdGluZyBvdGhlcnMqL1xyXG4gICAgcG9zaXRpb246IHN0aWNreTtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkthcmxhXCIsIHNhbnMtc2VyaWY7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcblxyXG4vKiBcclxuICAjI0RldmljZSA9IERlc2t0b3BzXHJcbiAgIyNTY3JlZW4gPSAxMjgxcHggdG8gaGlnaGVyIHJlc29sdXRpb24gZGVza3RvcHNcclxuKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAxMjgxcHgpIHtcclxuICAgIC8qIENTUyAqL1xyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IExhcHRvcHMsIERlc2t0b3BzXHJcbiAgICAjI1NjcmVlbiA9IEIvdyAxMDI1cHggdG8gMTI4MHB4XHJcbiAgKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAxMDI1cHgpIGFuZCAobWF4LXdpZHRoOiAxMjgwcHgpIHtcclxuICAgIC8qIENTUyAqL1xyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IFRhYmxldHMsIElwYWRzIChwb3J0cmFpdClcclxuICAgICMjU2NyZWVuID0gQi93IDc2OHB4IHRvIDEwMjRweFxyXG4gICovXHJcblxyXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDI0cHgpIHtcclxuICAgIC8qIENTUyAqL1xyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IFRhYmxldHMsIElwYWRzIChsYW5kc2NhcGUpXHJcbiAgICAjI1NjcmVlbiA9IEIvdyA3NjhweCB0byAxMDI0cHhcclxuICAqL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSBhbmQgKG1heC13aWR0aDogMTAyNHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcclxuICAgIC8qIENTUyAqL1xyXG59XHJcblxyXG5cclxuLyogXHJcbiAgICAjI0RldmljZSA9IExvdyBSZXNvbHV0aW9uIFRhYmxldHMsIE1vYmlsZXMgKExhbmRzY2FwZSlcclxuICAgICMjU2NyZWVuID0gQi93IDQ4MXB4IHRvIDc2N3B4XHJcbiAgKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAubmF2YmFyLWJyYW5kIHtcclxuICAgICAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICB9XHJcbiAgICAjc3VidG90YWwge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICAgICNjYXJ0LWJhci1kaXYge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIH1cclxuICAgICNjbGVhci1jYXJ0LWJ0biB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gICAgI3ZpZXctY2FydC1idG4ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qIFxyXG4gICAgIyNEZXZpY2UgPSBNb3N0IG9mIHRoZSBTbWFydHBob25lcyBNb2JpbGVzIChQb3J0cmFpdClcclxuICAgICMjU2NyZWVuID0gQi93IDMyMHB4IHRvIDQ3OXB4XHJcbiAgKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiAzMjBweCkgYW5kIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgICAubmF2YmFyLWJyYW5kIHtcclxuICAgICAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICB9XHJcbiAgICAjc3VidG90YWwge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICAgICNjYXJ0LWJhci1kaXYge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIH1cclxuICAgICNjbGVhci1jYXJ0LWJ0biB7XHJcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgfVxyXG4gICAgI3ZpZXctY2FydC1idG4ge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxufSJdfQ== */"] });


/***/ }),

/***/ "cqXK":
/*!**********************************************************!*\
  !*** ./src/app/route-guards/admin-auth-guard.service.ts ***!
  \**********************************************************/
/*! exports provided: AdminAuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminAuthGuard", function() { return AdminAuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");



class AdminAuthGuard {
    constructor(handleLocalStorage, router) {
        this.handleLocalStorage = handleLocalStorage;
        this.router = router;
    }
    canActivate() {
        if (this.handleLocalStorage.getIsAdmin() == 'false' ||
            this.handleLocalStorage.getIsAdmin() == null) {
            this.router.navigate(['not-found']);
            return false;
        }
        return true;
    }
}
AdminAuthGuard.ɵfac = function AdminAuthGuard_Factory(t) { return new (t || AdminAuthGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_1__["HandleLocalStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"])); };
AdminAuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AdminAuthGuard, factory: AdminAuthGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "dVxj":
/*!*************************************************************!*\
  !*** ./src/app/global/drinks-icon/drinks-icon.component.ts ***!
  \*************************************************************/
/*! exports provided: DrinksIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DrinksIconComponent", function() { return DrinksIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class DrinksIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
DrinksIconComponent.ɵfac = function DrinksIconComponent_Factory(t) { return new (t || DrinksIconComponent)(); };
DrinksIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DrinksIconComponent, selectors: [["app-drinks-icon"]], decls: 18, vars: 0, consts: [["height", "35", "width", "35", "version", "1.1", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 20.751 20.751", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 20.751 20.751"], ["d", "M9.962,10.465c0-0.855-0.211-1.682-0.616-2.392L9.25,7.905H3.24L3.146,8.073\n\t\tC2.742,8.782,2.53,9.61,2.53,10.465c0,2.181,1.388,3.988,3.189,4.287v5.093c-1.039,0.042-1.813,0.2-1.813,0.387\n\t\tc0,0.222,1.055,0.4,2.357,0.4c1.303,0,2.36-0.178,2.36-0.4c0-0.187-0.774-0.345-1.813-0.387v-5.097\n\t\tC8.593,14.43,9.962,12.63,9.962,10.465z M6.245,14.131c-1.682,0-3.052-1.644-3.052-3.668c0-0.674,0.151-1.325,0.44-1.896h5.225\n\t\tc0.288,0.571,0.441,1.223,0.441,1.896C9.3,12.488,7.928,14.131,6.245,14.131z M16.325,2.292h-2.643V0h2.643V2.292z M16.325,5.132\n\t\tV2.997h-2.643v2.136c-1.116,0.503-1.896,1.625-1.896,2.931v2.093v6.673v3.921h6.434V16.83v-6.673V8.064\n\t\tC18.221,6.758,17.443,5.636,16.325,5.132z M17.652,17.516h-5.241v-6.288h5.241V17.516z M9.022,10.534c0,0-0.139,3.325-2.732,3.325\n\t\ts-2.943-3.325-2.943-3.325H9.022z", 2, "fill", "#010002"]], template: function DrinksIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "path", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJkcmlua3MtaWNvbi5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "fEtg":
/*!*********************************************************!*\
  !*** ./src/app/global/not-found/not-found.component.ts ***!
  \*********************************************************/
/*! exports provided: NotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotFoundComponent", function() { return NotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


const _c0 = function () { return [""]; };
class NotFoundComponent {
    constructor() { }
    ngOnInit() {
    }
}
NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) { return new (t || NotFoundComponent)(); };
NotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NotFoundComponent, selectors: [["app-not-found"]], decls: 34, vars: 2, consts: [[1, "main"], ["xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "width", "470", "height", "290", "viewBox", "0 0 470 290"], ["id", "prefix__a", "d", "M5.063 128.67c-2.513 15.192 5.633 31.093 17.898 38.941 5.99 3.832 13.34 6.528 16.471 13.254 4.868 10.452-3.879 22.437-13.113 28.515-9.236 6.078-20.5 10.9-24.704 21.683-2.771 7.108-1.685 15.387 1.058 22.507 10.06 26.112 39.393 37.547 65.479 36.15 26.086-1.396 50.827-12.407 76.416-18.075 87.873-19.465 180.005 24.717 267.728 4.47 13.65-3.151 27.4-8.081 37.943-17.99 11.883-11.167 18.632-28.016 19.65-45.023.97-16.225-4.34-34.495-17.744-41.806-7.834-4.273-17.196-4.1-25.7-1.774-5.43 1.483-10.767 3.808-16.369 3.848-5.601.038-11.763-3-13.386-8.808-1.707-6.107 2.182-12.41 6.642-16.577 9.072-8.474 21.203-12.707 29.441-22.126 7.927-9.063 11.264-22.574 8.574-34.716-2.692-12.141-11.326-22.538-22.188-26.715-27.683-10.645-57.844 18.377-86.152 9.873-2.101-.63-4.312-1.605-5.418-3.641-1.08-1.988-.834-4.51-.214-6.716 3.468-12.348 16.939-20.21 17.528-33.102.32-7.008-3.504-13.564-8.325-18.251-33.126-32.2-81.125 6.102-114.9 18.194-55.542 19.884-112.157 36.49-167.849 55.963-20.81 7.275-44.91 18.606-48.766 41.922z", 1, "fundo"], ["fill", "none", "fill-rule", "evenodd"], ["fill", "#FFF", "d", "M0 0H1366V800H0z", "transform", "translate(-448 -157)"], ["transform", "translate(-448 -157) translate(448 157)"], ["id", "prefix__b", "fill", "#fff"], [0, "xlink", "href", "#prefix__a"], ["fill", "#F6F6F7", 0, "xlink", "href", "#prefix__a"], ["fill", "#EDEDF0", "fill-rule", "nonzero", "d", "M-14.199 211.2H481.36V301.2H-14.199z", "mask", "url(#prefix__b)"], [1, "paes"], [1, "pao-baixo"], ["fill", "#FBB965", "d", "M2.79 131.737s-2.073 3.155-2.479 6.868c-.406 3.713-.747 9.666 1.24 13.372 1.985 3.707 12.69 20.8 65.175 21.02 53.15.225 69.188-15.685 70.59-18.977 2.605-6.118 1.838-21.327.06-22.283-1.777-.956-44.044-3.204-72.446-4.057-28.402-.854-49.872-1.968-62.14 4.057", "transform", "translate(161 68)"], ["fill", "#E6A95F", "d", "M34.648 167.758c-8.863-1.526-23.515-6.939-30.292-14.218-6.775-7.28-2.096-8.803 3.508-5.387 5.605 3.415 24.569 11.557 54.124 12.263 29.555.706 61.424-6.946 72.2-17.053 0 0 2.705-1.47 2.768 1.509.062 2.98.428 7.948-2.769 10.507-3.196 2.558-34.805 23.526-99.54 12.379", "transform", "translate(161 68)"], ["fill", "#FFDA7F", "d", "M5.679 131.837c-6.522 1.646-.275 6.91 9.492 12.14 9.767 5.229 28.24 10.257 44.267 10.015 16.028-.243 37.48-.481 52.543-5.333 15.06-4.852 16.223-9.55 17.998-13.298 1.774-3.748-107.32-7.809-124.3-3.524", "transform", "translate(161 68)"], [1, "pao-cima"], ["fill", "#FBB868", "d", "M71.37 0C49.008.035-2.43.631 1.18 51.16c0 0-.018 10.84 62.825 10.84 62.844 0 72.591-9.633 73.721-11.173C142.284 44.623 147.583-.117 71.37 0", "transform", "translate(161 68)"], ["fill", "#E6A95F", "d", "M34.552 61c-7.628-1.006-23.98-2.904-27.586-5.506-3.606-2.604-7.448-2.895-5.39-10.826.842-3.242 7.976-.619 11.264.839 3.289 1.458 21.239 6.047 42.989 6.673 21.75.625 57.126-1.679 67.42-5.458 9.806-3.598 13.662-7.027 15.493-5.228 2.396 2.351 1.687 8.008-4.913 12.215-6.252 3.985-27.53 7.2-49.434 7.76-21.904.56-38.604 1.012-49.843-.469", "transform", "translate(161 68)"], ["fill", "#FFEAD4", "d", "M45.508 13.114c-.368.549-.54 1.598-.503 2.445.017.392.297.604.45.287.143-.297.222-.617.303-.978.087-.387.197-.735.238-1.15.042-.44-.257-.95-.488-.604M42.092 9.016c-.694.13-1.446.61-1.774 1.098-.168.248-.3.512-.317.792-.017.313.154.503.29.776.249.494 1.245.392 1.22-.162-.014-.274.33-.612.54-.817.367-.361.75-.62.923-1.075.154-.404-.413-.7-.882-.612M51.621 9.247c-.182-.409-.68-.325-.615.364.063.687.007 1.485.25 2.067.19.458.694.473.737-.25.043-.759-.109-1.592-.372-2.181M32.55 15.101c-1.206.547-1.849 1.662-1.414 2.552.188.384 1.21.504 1.46.077.188-.32.407-.629.616-.942.243-.363.63-.675.767-1.064.173-.486-.753-.93-1.43-.623M29.793 9.012c-.26-.108-.498.532-.62.942-.166.565-.205 1.033-.149 1.674.053.59.424.405.493-.048-.002.014.102-.302.138-.4.093-.247.18-.497.262-.76.113-.359.144-1.297-.124-1.408M38.384 6.056c-.737-.211-1.406.211-1.881.674-.53.514-.607 1.19-.39 1.829.167.5 1.09.632 1.326.096.127-.285.31-.53.533-.764.304-.32.72-.44.944-.848.237-.429-.053-.85-.532-.987M21.722 10.101c-.484-.28-1.16.08-1.542.378-.57.444-.957.924-1.152 1.628-.21.764.802 1.182 1.296.663.4-.42.901-.746 1.308-1.172.319-.334.594-1.205.09-1.497M23.513 15.078c-.385.414-.505 1.566-.513 2.381-.005.47.333.749.47.35.206-.592.422-1.34.517-2.047.082-.598-.253-.921-.474-.684M38.964 14.6c-.26-.324-1.293-.581-2.192-.6-.626-.012-.971.28-.65.452.459.244 1.155.57 2.063.547.56-.014.936-.205.78-.4M51.58 3.028c-.54-.1-.912.074-1.399.401-.45.304-.83.813-1.092 1.395-.344.76.386 1.437.866 1.076.662-.5 1.41-.857 1.914-1.641.255-.397.126-1.152-.29-1.23M66.234 9c-.923 0-2.062.305-2.227.708-.074.182.437.384.836.247.537-.185 1.29-.187 1.832-.364.59-.193.337-.591-.441-.591M60.589 9.375c-.101-.522-.482-.493-.556.048-.12.852.102 1.815.423 2.412.213.396.543.02.544-.494.002-.736-.283-1.302-.411-1.966M69.955 3.569c-.44-.473-1.713-.712-2.727-.479-.37.085-.24.315.044.396.601.173 1.168.408 1.848.503.49.069 1.042-.199.835-.42M73.956 10.626c-.231-.836-.735-1.255-1.316-1.507-.24-.104-.5-.147-.75-.1-.148.028-.273.063-.407.161-.032.022-.373.238-.223.161-.282.148-.382.791-.057.979.117.067.22.24.333.325.168.128.336.247.508.364.327.219.564.609.873.868.537.45 1.27-.42 1.04-1.251M66.549 15.017c-.83-.233-.486 2.056-.435 2.528.055.51.678.664.741.08.068-.628.42-2.405-.306-2.608M54.803 16.301c-.065-.347-.1-.709-.19-1.038-.107-.393-.44-.32-.532.052-.186.746-.052 2.313.405 2.636.225.16.545-.077.512-.623-.024-.375-.13-.676-.195-1.027M39.534 21.024c-.423.212-.58 1.352-.523 2.174.066.946.664 1.13.785.144.065-.538.22-1.041.203-1.612-.016-.528-.238-.82-.465-.706M15.946 21.201c-.04-.142-.134-.197-.214-.2-.311-.02-.464.621-.576 1.05-.124.468-.188.945-.14 1.461.053.562.486.699.57.088.053-.375.146-.754.233-1.107.108-.439.265-.815.127-1.292M14.918 16.274c-.067-.169-.25-.279-.46-.274-.571.015-1.05.232-1.55.61-.562.422-.976 1.023-.899 1.675.081.697.993.942 1.574.476.407-.326.746-.755 1.058-1.149.364-.462.441-.923.277-1.338M62.906 5.209c-.447-.277-1.34-.251-1.957-.083-.279.077-.57.172-.738.298-.069.051-.108.105-.15.16-.025.038-.037.076-.038.115.043.077.042.09-.003.037-.154.243.622.357.925.173.227-.051.444-.104.705-.13.521-.054 1.021-.089 1.286-.315.092-.078.088-.182-.03-.255M52.906 8.291c-.191-.24-.402-.204-.634-.28-.218-.073-.326.255-.245.491.117.34.438.509.697.497.26-.01.37-.472.182-.708M80.437 1.283c-.385-.22-.844-.327-1.272-.266-.497.071-.7.363-1.033.724-.356.388.07 1.143.54.93l-.065-.083c.095.05.192.08.295.09.177.032.31.074.477.16.373.189.702.503 1.023.78.348.301 1.738.788 1.586-.245-.141-.963-.789-1.652-1.551-2.09M78.955 8.082c-.134-.55-.259-1.126-.366-1.703-.102-.548-.457-.476-.541.05-.073.453-.057.877.01 1.331.083.548.286.874.512 1.17.11.144.276.048.357-.132.097-.215.088-.476.028-.716M87.395 8c-.77.016-1.317.338-2.032.43-.505.065-.477.525.046.56.713.047 1.359-.082 2.053-.14.468-.04 1.35.253 1.516-.164.191-.483-.906-.7-1.583-.685M81.958 14.767c-.103-.44-.306-.8-.377-1.279-.095-.644-.518-.678-.57.063-.07.998.19 1.845.53 2.34.293.426.566-.494.417-1.124M99.918 9.365c-.177-.18-.36-.23-.56-.337-.295-.16-.508.405-.225.646.181.155.805.626.863.04.012-.119-.003-.273-.078-.349M93.308 4.792c-.387-.436-.932-.682-1.466-.78-.809-.145-1.17 1.02-.47 1.477.65.427 1.772 2.34 2.503 1.097.376-.641-.178-1.356-.567-1.794M91.498 10.138c-.32.55-.428 1.334-.494 2.18-.043.546.266.928.442.494.21-.512.38-1.126.522-1.741.139-.605-.204-1.393-.47-.933M103.977 8.863c-.265-1.177-1.477-2.153-2.51-1.784-.548.195-.653 1.156-.104 1.442.294.153.53.397.762.655.326.36.549.611.988.784.564.223.992-.535.864-1.097M100.988 4.781c.03-.437-.169-.702-.568-.724-.906-.33-1.89.849-2.3 1.608-.47.873.538 1.63 1.223 1.22.683-.406 1.786-1.108 1.645-2.104M110.532 7.06c-.238-.218-.568.203-.463.619l.012.045c-.01.096-.001.204 0 .297 0 .14-.016.294-.025.434-.012.181-.043.357-.053.539-.013.245.016.45.06.612.091.33.32.515.53.304.108-.11.286-.37.335-.709.04-.276.058-.554.07-.836.024-.568-.189-1.052-.466-1.306M108.458 14.127c-.434-.548-.995-.921-1.662-1.103-.746-.203-1.116.933-.445 1.28.216.11.4.251.557.443.204.248.42.648.672.84.348.262.868.645 1.249.23.437-.478-.064-1.305-.37-1.69M117.71 13.184c-.282.276-.558.555-.852.815-.143.126-.333.256-.446.42-.108.156-.174.34-.284.489-.392.535.193 1.412.694.973.104-.091.318-.086.446-.134.16-.062.324-.11.486-.169.51-.186.872-.578 1.145-1.11.418-.816-.553-1.907-1.188-1.284M97.93 18.019c-.834-.165-1.209.791-.697 1.348.495.538 1.83 2.49 2.627 1.2.636-1.034-1.044-2.373-1.93-2.548M124.69 17.006c-.372.072-.428.396-.629.626-.202.23.139.496.376.3.22-.181.506-.403.559-.676.032-.168-.129-.285-.307-.25M115.979 19.839c-.079-.499-.153-.976-.264-1.445-.205-.86-.853-.174-.689.73.089.49.148.982.25 1.46.196.907.849.182.703-.745M78.957 24.496c.068-.31.05-.616-.02-.91-.077-.321-.14-.65-.183-1.002-.099-.82-.671-.76-.736.076-.056.71.019 1.361.23 1.918.132.348.265.461.467.377-.18.076.075.038.116.016.071-.038.117-.183.135-.33.01-.08.063-.472-.009-.145M61.924 22.403c-.057-.057-.16-.13-.189-.2-.132-.33-.73-.229-.735.1-.004.27.047.533.379.665.186.073.458.02.543-.14l.027-.053c.06-.114.083-.266-.025-.372M106.798 22.22c-.107-.292-.757-.304-.794.028-.032.293.107.618.488.731.229.068.532-.032.507-.257-.021-.186-.137-.329-.201-.502M70.884 28.197c-.13-.291-.716-.24-.83.025-.131.304-.034.606.41.754.101.033.24.034.334-.012.326-.16.181-.553.086-.767", "transform", "translate(161 68)"], [1, "olhos"], ["fill", "#633", "d", "M51.976 32.505c.27 2.748-1.735 5.197-4.476 5.47-2.748.274-5.199-1.732-5.476-4.48-.27-2.748 1.735-5.197 4.483-5.47 2.748-.274 5.192 1.733 5.469 4.48M93.976 28.505c.27 2.748-1.735 5.197-4.483 5.47-2.748.273-5.192-1.733-5.469-4.48-.27-2.748 1.735-5.197 4.483-5.47 2.748-.274 5.192 1.733 5.469  4.48M65.03 45.127c2.1-5.726 9.106-6.606 13.113-2.171.408.462-.277 1.204-.725.77-3.981-3.892-9.17-2.951-11.83 1.745-.187.333-.68-.002-.558-.344 ", "transform", "translate(161 68)"], ["fill-rule", "nonzero", "stroke", "#979797", "stroke-linecap", "round", "stroke-width", "1.8", 1, "left-sparks"], ["d", "M23.684 5.789L30 1.158", "transform", "rotate(-90 157 13)"], ["d", "M0 5.789L6.316 1.158", "transform", "rotate(-90 157 13) matrix(-1 0 0 1 6.316 0)"], ["d", "M15.789 4.632L15.789 0", "transform", "rotate(-90 157 13)"], ["fill-rule", "nonzero", "stroke", "#979797", "stroke-linecap", "round", "stroke-width", "1.8", 1, "right-sparks"], ["d", "M23.684 5.789L30 1.158", "transform", "matrix(0 -1 -1 0 318 170)"], ["d", "M0 5.789L6.316 1.158", "transform", "matrix(0 -1 -1 0 318 170) matrix(-1 0 0 1 6.316 0)"], ["d", "M15.789 4.632L15.789 0", "transform", "matrix(0 -1 -1 0 318 170)"], ["fill", "#4B4B62", "fill-rule", "nonzero", "stroke", "#4B4B62", "stroke-width", "2", "d", "M198.754 186c1.56 0 2.246-.703 2.246-2.3v-41.4c0-1.597-.686-2.3-2.246-2.3h-9.608c-1.56 0-2.247.703-2.247 2.3v19.678h-5.802c-1.185 0-1.934-.83-1.934-2.172V142.3c0-1.597-.686-2.3-2.246-2.3h-9.67c-1.56 0-2.247.703-2.247 2.3v22.425c0 7.283 3.244 10.606 11.355 10.606H186.9v8.369c0 1.597.687 2.3 2.247 2.3h9.608zm32.277 1c15.3 0 18.969-5.248 18.969-13.056V152.12c0-7.808-3.67-13.12-18.969-13.12-15.3 0-19.031 5.312-19.031 13.12v21.824c0 7.808 3.732 13.056 19.031 13.056zm.969-12c-4.25 0-5-1.27-5-2.986v-17.091c0-1.652.75-2.923 5-2.923 4.313 0 5 1.27 5 2.923v17.09c0 1.716-.688 2.987-5 2.987zm62.754 11c1.56 0 2.246-.703 2.246-2.3v-41.4c0-1.597-.686-2.3-2.246-2.3h-9.608c-1.56 0-2.247.703-2.247 2.3v19.678h-5.802c-1.185 0-1.934-.83-1.934-2.172V142.3c0-1.597-.686-2.3-2.246-2.3h-9.67c-1.56 0-2.247.703-2.247 2.3v22.425c0 7.283 3.244 10.606 11.355 10.606H282.9v8.369c0 1.597.687 2.3 2.247 2.3h9.608z", 1, "path"], [1, "home-link", "text-center"], [2, "color", "grey", 3, "routerLink"]], template: function NotFoundComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "defs");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "g", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mask", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "use", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "use", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "g", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "g", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "path", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "path", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "g", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "path", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "g", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "g", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "path", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "path", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "g", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "path", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "a", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "Return to homepage.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c0));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: [".fundo[_ngcontent-%COMP%] {\r\n    animation: scales 3s alternate infinite;\r\n    transform-origin: center;\r\n}\r\n\r\n.pao-baixo[_ngcontent-%COMP%] {\r\n    animation: rotatepao 14s cubic-bezier(0.1, 0.49, 0.41, 0.97) infinite;\r\n    transform-origin: center;\r\n}\r\n\r\n.pao-cima[_ngcontent-%COMP%] {\r\n    animation: rotatepao 7s 1s cubic-bezier(0.1, 0.49, 0.41, 0.97) infinite;\r\n    transform-origin: center;\r\n}\r\n\r\n.olhos[_ngcontent-%COMP%] {\r\n    animation: olhos 2s alternate infinite;\r\n    transform-origin: center;\r\n}\r\n\r\n.left-sparks[_ngcontent-%COMP%] {\r\n    animation: left-sparks 4s alternate infinite;\r\n    transform-origin: 150px 156px;\r\n}\r\n\r\n.right-sparks[_ngcontent-%COMP%] {\r\n    animation: left-sparks 4s alternate infinite;\r\n    transform-origin: 310px 150px;\r\n}\r\n\r\n.olhos[_ngcontent-%COMP%] {\r\n    animation: olhos 2s alternate infinite;\r\n    transform-origin: center;\r\n}\r\n\r\n@keyframes scales {\r\n    from {\r\n        transform: scale(0.98);\r\n    }\r\n    to {\r\n        transform: scale(1);\r\n    }\r\n}\r\n\r\n@keyframes rotatepao {\r\n    0% {\r\n        transform: rotate(0deg);\r\n    }\r\n    50%,\r\n    60% {\r\n        transform: rotate(-20deg);\r\n    }\r\n    100% {\r\n        transform: rotate(0deg);\r\n    }\r\n}\r\n\r\n@keyframes olhos {\r\n    0% {\r\n        transform: rotateX(0deg);\r\n    }\r\n    100% {\r\n        transform: rotateX(30deg);\r\n    }\r\n}\r\n\r\n@keyframes left-sparks {\r\n    0% {\r\n        opacity: 0;\r\n    }\r\n}\r\n\r\n.main[_ngcontent-%COMP%] {\r\n    min-height: 500px;\r\n    margin: 0px auto;\r\n    width: auto;\r\n    max-width: 460px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    padding-top: 20px;\r\n}\r\n\r\n.home-link[_ngcontent-%COMP%] {\r\n    padding-bottom: 150px;\r\n}\r\n\r\n.path[_ngcontent-%COMP%] {\r\n    stroke-dasharray: 300;\r\n    stroke-dashoffset: 300;\r\n    animation: dash 4s alternate infinite;\r\n}\r\n\r\n@keyframes dash {\r\n    0%,\r\n    30% {\r\n        fill: 4b4b62;\r\n        stroke-dashoffset: 0;\r\n    }\r\n    80%,\r\n    100% {\r\n        fill: transparent;\r\n        stroke-dashoffset: -200;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdC1mb3VuZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksdUNBQXVDO0lBQ3ZDLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLHFFQUFxRTtJQUNyRSx3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSx1RUFBdUU7SUFDdkUsd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksc0NBQXNDO0lBQ3RDLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLDRDQUE0QztJQUM1Qyw2QkFBNkI7QUFDakM7O0FBRUE7SUFDSSw0Q0FBNEM7SUFDNUMsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksc0NBQXNDO0lBQ3RDLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJO1FBQ0ksc0JBQXNCO0lBQzFCO0lBQ0E7UUFDSSxtQkFBbUI7SUFDdkI7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksdUJBQXVCO0lBQzNCO0lBQ0E7O1FBRUkseUJBQXlCO0lBQzdCO0lBQ0E7UUFDSSx1QkFBdUI7SUFDM0I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksd0JBQXdCO0lBQzVCO0lBQ0E7UUFDSSx5QkFBeUI7SUFDN0I7QUFDSjs7QUFFQTtJQUNJO1FBQ0ksVUFBVTtJQUNkO0FBQ0o7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLFdBQVc7SUFDWCxnQkFBZ0I7SUFDaEIsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLHNCQUFzQjtJQUN0QixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSTs7UUFFSSxZQUFZO1FBQ1osb0JBQW9CO0lBQ3hCO0lBQ0E7O1FBRUksaUJBQWlCO1FBQ2pCLHVCQUF1QjtJQUMzQjtBQUNKIiwiZmlsZSI6Im5vdC1mb3VuZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bmRvIHtcclxuICAgIGFuaW1hdGlvbjogc2NhbGVzIDNzIGFsdGVybmF0ZSBpbmZpbml0ZTtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxufVxyXG5cclxuLnBhby1iYWl4byB7XHJcbiAgICBhbmltYXRpb246IHJvdGF0ZXBhbyAxNHMgY3ViaWMtYmV6aWVyKDAuMSwgMC40OSwgMC40MSwgMC45NykgaW5maW5pdGU7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wYW8tY2ltYSB7XHJcbiAgICBhbmltYXRpb246IHJvdGF0ZXBhbyA3cyAxcyBjdWJpYy1iZXppZXIoMC4xLCAwLjQ5LCAwLjQxLCAwLjk3KSBpbmZpbml0ZTtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlcjtcclxufVxyXG5cclxuLm9saG9zIHtcclxuICAgIGFuaW1hdGlvbjogb2xob3MgMnMgYWx0ZXJuYXRlIGluZmluaXRlO1xyXG4gICAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xyXG59XHJcblxyXG4ubGVmdC1zcGFya3Mge1xyXG4gICAgYW5pbWF0aW9uOiBsZWZ0LXNwYXJrcyA0cyBhbHRlcm5hdGUgaW5maW5pdGU7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiAxNTBweCAxNTZweDtcclxufVxyXG5cclxuLnJpZ2h0LXNwYXJrcyB7XHJcbiAgICBhbmltYXRpb246IGxlZnQtc3BhcmtzIDRzIGFsdGVybmF0ZSBpbmZpbml0ZTtcclxuICAgIHRyYW5zZm9ybS1vcmlnaW46IDMxMHB4IDE1MHB4O1xyXG59XHJcblxyXG4ub2xob3Mge1xyXG4gICAgYW5pbWF0aW9uOiBvbGhvcyAycyBhbHRlcm5hdGUgaW5maW5pdGU7XHJcbiAgICB0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc2NhbGVzIHtcclxuICAgIGZyb20ge1xyXG4gICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XHJcbiAgICB9XHJcbiAgICB0byB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcclxuICAgIH1cclxufVxyXG5cclxuQGtleWZyYW1lcyByb3RhdGVwYW8ge1xyXG4gICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xyXG4gICAgfVxyXG4gICAgNTAlLFxyXG4gICAgNjAlIHtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtMjBkZWcpO1xyXG4gICAgfVxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgb2xob3Mge1xyXG4gICAgMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgwZGVnKTtcclxuICAgIH1cclxuICAgIDEwMCUge1xyXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWCgzMGRlZyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgbGVmdC1zcGFya3Mge1xyXG4gICAgMCUge1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5tYWluIHtcclxuICAgIG1pbi1oZWlnaHQ6IDUwMHB4O1xyXG4gICAgbWFyZ2luOiAwcHggYXV0bztcclxuICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgbWF4LXdpZHRoOiA0NjBweDtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcclxufVxyXG5cclxuLmhvbWUtbGluayB7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMTUwcHg7XHJcbn1cclxuXHJcbi5wYXRoIHtcclxuICAgIHN0cm9rZS1kYXNoYXJyYXk6IDMwMDtcclxuICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAzMDA7XHJcbiAgICBhbmltYXRpb246IGRhc2ggNHMgYWx0ZXJuYXRlIGluZmluaXRlO1xyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGRhc2gge1xyXG4gICAgMCUsXHJcbiAgICAzMCUge1xyXG4gICAgICAgIGZpbGw6IDRiNGI2MjtcclxuICAgICAgICBzdHJva2UtZGFzaG9mZnNldDogMDtcclxuICAgIH1cclxuICAgIDgwJSxcclxuICAgIDEwMCUge1xyXG4gICAgICAgIGZpbGw6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgIHN0cm9rZS1kYXNob2Zmc2V0OiAtMjAwO1xyXG4gICAgfVxyXG59Il19 */"] });


/***/ }),

/***/ "iKEw":
/*!*****************************************************************!*\
  !*** ./src/app/global/starters-icon/starters-icon.component.ts ***!
  \*****************************************************************/
/*! exports provided: StartersIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StartersIconComponent", function() { return StartersIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class StartersIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
StartersIconComponent.ɵfac = function StartersIconComponent_Factory(t) { return new (t || StartersIconComponent)(); };
StartersIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StartersIconComponent, selectors: [["app-starters-icon"]], decls: 28, vars: 0, consts: [["height", "35", "width", "35", "version", "1.1", "id", "Layer_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 511.996 511.996", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 511.996 511.996"], ["d", "M213.326,394.653c-5.891,0-10.656,4.781-10.656,10.688c0,5.875,4.766,10.656,10.656,10.656\n\t\t\tc5.891,0,10.672-4.781,10.672-10.656C223.998,399.435,219.217,394.653,213.326,394.653z"], ["d", "M255.998,415.997c-5.891,0-10.672,4.781-10.672,10.656c0,5.907,4.781,10.688,10.672,10.688s10.672-4.781,10.672-10.688\n\t\t\tC266.67,420.778,261.889,415.997,255.998,415.997z"], ["d", "M298.67,394.653c-5.89,0-10.672,4.782-10.672,10.688c0,5.875,4.781,10.656,10.672,10.656s10.656-4.781,10.656-10.656\n\t\t\tC309.326,399.435,304.56,394.653,298.67,394.653z"], ["d", "M319.998,298.656c17.672,0,32-14.312,32-31.992c0-17.672-14.328-32-32-32H266.67v-10.665h85.328\n\t\t\tc0-49.414-37.328-90.101-85.328-95.406V10.672v-0.008C266.67,4.773,261.889,0,255.998,0s-10.672,4.773-10.672,10.664v0.008\n\t\t\tv117.921c-48,5.305-85.328,45.992-85.328,95.406h85.328v10.664h-53.328c-17.672,0-32,14.328-32,32\n\t\t\tc0,17.68,14.328,31.992,32,31.992h53.328v24.438c-37.547,11.625-70.062-2.062-70.406-2.203c-1.297-0.578-2.734-0.891-4.25-0.891\n\t\t\tc-5.891,0-10.672,4.781-10.672,10.656c0,4.375,2.625,8.125,6.375,9.781c0.016,0,0.047,0.016,0.078,0.031s0.078,0.031,0.109,0.031\n\t\t\tc2.297,1,21.094,8.688,47.172,8.688c9.688,0,20.375-1.062,31.594-3.938v17.406h-85.328V469.34h85.328v31.984c0,0,0,0,0,0.016\n\t\t\tc0,5.875,4.781,10.656,10.672,10.656s10.672-4.781,10.672-10.656c0-0.016,0-0.016,0-0.016V469.34h85.328V362.655H266.67v-24.406\n\t\t\tc37.547-11.641,70.062,2.047,70.375,2.188c1.312,0.562,2.766,0.906,4.281,0.906c5.891,0,10.672-4.781,10.672-10.688\n\t\t\tc0-4.344-2.625-8.094-6.375-9.75c-0.016-0.016-0.047-0.031-0.094-0.031c-0.031-0.031-0.062-0.031-0.094-0.062\n\t\t\tc-3.141-1.344-37.312-15.281-78.766-4.75v-17.406H319.998z M219.076,202.664c7.391-12.734,21.172-21.328,36.922-21.328\n\t\t\tc5.891,0,10.672-4.781,10.672-10.672s-4.781-10.665-10.672-10.665c-27.859,0-51.547,17.812-60.344,42.664h-11.25\n\t\t\tc3.485-11.765,9.875-22.539,18.797-31.46c14.109-14.102,32.859-21.867,52.797-21.867s38.688,7.765,52.797,21.867\n\t\t\tc8.922,8.922,15.312,19.695,18.797,31.461H219.076z M330.67,383.999v63.998H181.326v-63.998H330.67z M191.998,277.343\n\t\t\tc-5.875,0-10.672-4.797-10.672-10.68c0-5.875,4.797-10.664,10.672-10.664h128c5.875,0,10.672,4.789,10.672,10.664\n\t\t\tc0,5.883-4.797,10.68-10.672,10.68H191.998z"]], template: function StartersIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](19, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzdGFydGVycy1pY29uLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "kS/D":
/*!************************************************!*\
  !*** ./src/app/services/order-data.service.ts ***!
  \************************************************/
/*! exports provided: OrderDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderDataService", function() { return OrderDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _handle_local_storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");






class OrderDataService {
    constructor(http, handleLocalStorageService, afdb) {
        this.http = http;
        this.handleLocalStorageService = handleLocalStorageService;
        this.afdb = afdb;
        this.uid = this.handleLocalStorageService.getUser();
    }
    // adds item data to Firebase DB
    addOrderData(orderData, totalAmt) {
        const orderObj = this.formatOrderData(orderData, totalAmt);
        const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].firebase.databaseURL + '/orders/' + this.uid + '.json';
        return this.http.post(path, orderObj);
    }
    formatOrderData(od, amt) {
        let orderDetailsObj = {};
        for (let key in od) {
            const _obj = {
                [od[key].id]: {
                    itemId: od[key].id,
                    name: od[key].name,
                    price: od[key].price,
                    quantity: od[key].quantity,
                },
            };
            orderDetailsObj = Object.assign(Object.assign({}, orderDetailsObj), { [od[key].id]: _obj[od[key].id] });
        }
        const orderObj = {
            orderId: '',
            orderedItems: orderDetailsObj,
            addedOn: new Date().toLocaleString(),
            totalAmt: amt
        };
        return orderObj;
    }
    setOrderId(idParam) {
        let orderId = 'order' + idParam;
        const orderRef = this.afdb.object('orders/' + this.uid + '/' + idParam);
        orderRef.update({ orderId: orderId });
    }
    getOrderData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const uid = this.handleLocalStorageService.getUser();
            const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].firebase.databaseURL + '/orders/' + uid + '.json';
            return yield this.http.get(path).toPromise();
        });
    }
    getOrderDataById(uid) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].firebase.databaseURL + '/orders/' + uid + '.json';
            return yield this.http.get(path).toPromise();
        });
    }
}
OrderDataService.ɵfac = function OrderDataService_Factory(t) { return new (t || OrderDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_4__["HandleLocalStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_5__["AngularFireDatabase"])); };
OrderDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: OrderDataService, factory: OrderDataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "lGQG":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "Jgta");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/firestore */ "I/3d");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/auth */ "UbJi");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _user_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-data.service */ "DPk/");
/* harmony import */ var _handle_local_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handle-local-storage.service */ "Dm4p");








/**
 * This service deals with user authentication.
 */
class AuthService {
    constructor(afs, afAuth, router, userDataService, handleLocalStorageService) {
        this.afs = afs;
        this.afAuth = afAuth;
        this.router = router;
        this.userDataService = userDataService;
        this.handleLocalStorageService = handleLocalStorageService;
        this.isAuthenticated = false;
        this.isAuthSub = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](null);
        this.authStateData = null;
        this.authStateSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        // subscribing to the observable that authState returns
        // so that we get updated whenever the authState data gets manipulated
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                handleLocalStorageService.setUser(user.uid);
                this.userDataService.getUserDataFromFirebase();
                // sync cart data
                this.setIsAuthenticated(true);
                handleLocalStorageService.setIsAuthenticated('true');
                this.setAuthState(user);
            }
            else {
                this.setIsAuthenticated(false);
                handleLocalStorageService.clearDataOnLogOut();
            }
        });
    }
    // sign in with email and password
    signIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }
    // sign up with email and password
    signUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }
    authenticateWithGoogle() {
        return this.afAuth.signInWithPopup(new firebase_app__WEBPACK_IMPORTED_MODULE_0__["default"].auth.GoogleAuthProvider());
    }
    autoLogIn() {
        if (localStorage.getItem('user') != null) {
            this.setIsAuthenticated(true);
            this.handleLocalStorageService.setIsAuthenticated('true');
        }
    }
    logOut() {
        this.afAuth.signOut().then(() => {
            this.handleLocalStorageService.clearDataOnLogOut();
            this.setIsAuthenticated(false);
            this.setAuthState(null);
            this.router.navigate(['']);
        });
    }
    getIsAuthObservable() {
        this.isAuthSub.next(this.isAuthenticated);
        return this.isAuthSub.asObservable();
    }
    setIsAuthenticated(v) {
        this.isAuthenticated = v;
        this.isAuthSub.next(this.isAuthenticated);
    }
    //
    getAuthStateObservable() {
        return this.authStateSubject.asObservable();
    }
    setAuthState(data) {
        this.authStateData = data;
        this.authStateSubject.next(this.authStateData);
    }
}
AuthService.ɵfac = function AuthService_Factory(t) { return new (t || AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_user_data_service__WEBPACK_IMPORTED_MODULE_6__["UserDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_7__["HandleLocalStorageService"])); };
AuthService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: AuthService, factory: AuthService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "mArq":
/*!**********************************************************!*\
  !*** ./src/app/confirm-order/confirm-order.component.ts ***!
  \**********************************************************/
/*! exports provided: ConfirmOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmOrderComponent", function() { return ConfirmOrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_handle_cart_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/handle-cart.service */ "PqqQ");
/* harmony import */ var _services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/handle-local-storage.service */ "Dm4p");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _services_order_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/order-data.service */ "kS/D");
/* harmony import */ var _services_user_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/user-data.service */ "DPk/");
/* harmony import */ var _services_item_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/item-data.service */ "vQsw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");









function ConfirmOrderComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "You need to first add items to your cart.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function ConfirmOrderComponent_div_7_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h5", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate3"](" \u20B9", item_r8.price, " \u00D7 ", item_r8.quantity, " = \u20B9", ctx_r2.getItemTotalAmount(item_r8.price, item_r8.quantity), " ");
} }
function ConfirmOrderComponent_div_7_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " You haven't set your address. Please do it otherwise we cannot confirm your order. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmOrderComponent_div_7_div_7_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r9.goToProfile(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Go to profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function ConfirmOrderComponent_div_7_div_8_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r12.name);
} }
function ConfirmOrderComponent_div_7_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h5");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Following items are currently not available:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ConfirmOrderComponent_div_7_div_8_li_4_Template, 2, 1, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r4.notAvailableItems);
} }
function ConfirmOrderComponent_div_7_div_9_button_4_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmOrderComponent_div_7_div_9_button_4_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); return ctx_r14.confirm(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Confirm");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function ConfirmOrderComponent_div_7_div_9_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConfirmOrderComponent_div_7_div_9_Template_button_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r16.goBackToCart(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Back to cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ConfirmOrderComponent_div_7_div_9_button_4_Template, 2, 0, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r5.notAvailableItems.length < 1);
} }
function ConfirmOrderComponent_div_7_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Your order has been placed successfully! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c0 = function () { return ["/orders"]; };
function ConfirmOrderComponent_div_7_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "My orders");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](1, _c0));
} }
function ConfirmOrderComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ConfirmOrderComponent_div_7_div_1_Template, 9, 4, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "(inclusive of 18% GST)");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ConfirmOrderComponent_div_7_div_7_Template, 5, 0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ConfirmOrderComponent_div_7_div_8_Template, 5, 1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ConfirmOrderComponent_div_7_div_9_Template, 5, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, ConfirmOrderComponent_div_7_div_10_Template, 2, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, ConfirmOrderComponent_div_7_div_11_Template, 4, 2, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.orderArray);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Total amount: \u20B9", ctx_r1.totalAmt, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.addressNotFound == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.notAvailableItems.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.isProcessing == false && ctx_r1.isOrdered == false);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.isOrdered == true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.isOrdered == true);
} }
class ConfirmOrderComponent {
    constructor(handleCartService, handleLocalStorageService, router, orderDataService, userDataService, itemDataService) {
        this.handleCartService = handleCartService;
        this.handleLocalStorageService = handleLocalStorageService;
        this.router = router;
        this.orderDataService = orderDataService;
        this.userDataService = userDataService;
        this.itemDataService = itemDataService;
        this.orderArray = [];
        this.isOrdered = false;
        this.isProcessing = false;
        this.addressNotFound = false;
        this.notAvailableItems = [];
        this.itemAvailabilityChecked = false;
        this.cartObj = JSON.parse(this.handleLocalStorageService.getCartData());
    }
    ngOnInit() {
        this.populateOrderData();
        this.handleCartService.hideCartBar(true);
        this.userDataService.checkAddressPresentOrNot().then((data) => {
            if (data == null || data == undefined || data.trim().length < 1) {
                this.addressNotFound = true;
            }
        });
    }
    ngOnDestroy() {
        this.handleCartService.hideCartBar(false);
    }
    populateOrderData() {
        if (this.cartObj != null && this.cartObj.items != undefined) {
            const itemD = this.cartObj.items;
            for (let item in itemD) {
                const itemObj = itemD[item];
                const obj = {
                    id: itemObj.itemId,
                    category: itemObj.category,
                    name: itemObj.name,
                    price: itemObj.price,
                    quantity: itemObj.quantity,
                };
                this.orderArray.push(obj);
            }
        }
        this.calculateTotalAmount();
    }
    getItemTotalAmount(price, quantity) {
        return Number(price) * Number(quantity);
    }
    calculateTotalAmount() {
        const GST_Amt = (18 / 100) * Number(this.cartObj.totalAmt);
        this.totalAmt = (Number(this.cartObj.totalAmt) + GST_Amt).toFixed(2);
    }
    goBackToCart() {
        this.router.navigate(['cart']);
    }
    confirm() {
        // don't allow to confirm order if address is not present
        if (this.addressNotFound === true) {
            return;
        }
        this.onConfirm();
    }
    onConfirm() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isProcessing = true;
            this.notAvailableItems = yield this.itemDataService.reportItemAvailability(this.orderArray);
            // if there are not available items in order
            if (this.notAvailableItems.length > 0) {
                this.isProcessing = false;
            }
            else {
                // clear cart
                this.cartObj = null;
                this.handleLocalStorageService.removeCartData();
                this.orderDataService
                    .addOrderData(this.orderArray, this.totalAmt)
                    .subscribe((res) => {
                    this.isOrdered = true;
                    this.orderDataService.setOrderId(res.name);
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }
    goToProfile() {
        let _name = this.makeProfilePath(this.handleLocalStorageService.getUserName());
        this.router.navigate(['profile', _name]);
    }
    /** utilities */
    /** make profile path from name of the user */
    makeProfilePath(v) {
        return v.split(' ').join('-');
    }
}
ConfirmOrderComponent.ɵfac = function ConfirmOrderComponent_Factory(t) { return new (t || ConfirmOrderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_handle_cart_service__WEBPACK_IMPORTED_MODULE_2__["HandleCartService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_handle_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["HandleLocalStorageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_order_data_service__WEBPACK_IMPORTED_MODULE_5__["OrderDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_user_data_service__WEBPACK_IMPORTED_MODULE_6__["UserDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_item_data_service__WEBPACK_IMPORTED_MODULE_7__["ItemDataService"])); };
ConfirmOrderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ConfirmOrderComponent, selectors: [["app-confirm-order"]], decls: 8, vars: 2, consts: [[1, "confirm-order-page"], [1, "album", "py-5"], [1, "container"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], ["class", "text-center", 4, "ngIf"], [4, "ngIf"], [1, "text-center"], [4, "ngFor", "ngForOf"], [1, "text-center", 2, "margin-top", "80px", "margin-bottom", "30px"], ["class", "mx-auto text-center", "style", "max-width: 500px; margin-top: 20px; margin-bottom: 50px;", 4, "ngIf"], ["class", "alert alert-danger mx-auto", "role", "alert", "style", "max-width: 500px; margin-bottom: 20px;", 4, "ngIf"], ["class", "text-center cart-btn-group", 4, "ngIf"], ["class", "alert alert-success mx-auto", "role", "alert", "style", "max-width: 500px;", 4, "ngIf"], [1, "card", "mb-3", "mx-auto", 2, "max-width", "700px"], [1, "row", "g-0"], [1, "col-md-8"], [1, "card-body"], [1, "card-title"], [1, "card-text", "item-price"], [1, "mx-auto", "text-center", 2, "max-width", "500px", "margin-top", "20px", "margin-bottom", "50px"], ["role", "alert", 1, "alert", "alert-danger"], [1, "btn", "btn-md", "btn-outline-primary", 3, "click"], ["role", "alert", 1, "alert", "alert-danger", "mx-auto", 2, "max-width", "500px", "margin-bottom", "20px"], [1, "text-center", "cart-btn-group"], [1, "form-group"], [1, "btn", "btn-outline-warning", 2, "margin-right", "15px", 3, "click"], ["class", "btn btn-outline-danger", 3, "click", 4, "ngIf"], [1, "btn", "btn-outline-danger", 3, "click"], ["role", "alert", 1, "alert", "alert-success", "mx-auto", 2, "max-width", "500px"], [1, "btn", "btn-outline-primary", 3, "routerLink"]], template: function ConfirmOrderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Confirm order");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ConfirmOrderComponent_div_6_Template, 3, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ConfirmOrderComponent_div_7_Template, 12, 7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.orderArray.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.orderArray.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"]], styles: [".confirm-order-page[_ngcontent-%COMP%] {\r\n    min-height: 120vh;\r\n    padding-top: 80px;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n}\r\n\r\n.card-title[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n}\r\n\r\n.item-price[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpcm0tb3JkZXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksZUFBZTtBQUNuQiIsImZpbGUiOiJjb25maXJtLW9yZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29uZmlybS1vcmRlci1wYWdlIHtcclxuICAgIG1pbi1oZWlnaHQ6IDEyMHZoO1xyXG4gICAgcGFkZGluZy10b3A6IDgwcHg7XHJcbn1cclxuXHJcbmRpdiB7XHJcbiAgICBmb250LWZhbWlseTogXCJLYXJsYVwiLCBzYW5zLXNlcmlmO1xyXG59XHJcblxyXG4uY2FyZC10aXRsZSB7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcbi5pdGVtLXByaWNlIHtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufSJdfQ== */"] });


/***/ }),

/***/ "rTIa":
/*!****************************************************!*\
  !*** ./src/app/order-page/order-page.component.ts ***!
  \****************************************************/
/*! exports provided: OrderPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderPageComponent", function() { return OrderPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_order_data_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/order-data.service */ "kS/D");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/loader/loader.component */ "yPJz");





function OrderPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-loader");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function OrderPageComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "You haven't ordered anything yet.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function OrderPageComponent_div_8_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const oi_r5 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate4"](" ", oi_r5.name, ": \u20B9", oi_r5.price, " \u00D7 ", oi_r5.quantity, " = \u20B9", ctx_r4.getItemTotalAmount(oi_r5.price, oi_r5.quantity), " ");
} }
function OrderPageComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h5", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, OrderPageComponent_div_8_div_9_Template, 3, 4, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "hr");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, " (inclusive of 18 %GST) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const order_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Order # ", order_r3.orderNo, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" placed on ", order_r3.addedOn, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("ID: ", order_r3.orderId, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", order_r3.orderedItems);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Total amount paid: \u20B9", order_r3.totalAmt, "");
} }
class OrderPageComponent {
    constructor(orderDataService) {
        this.orderDataService = orderDataService;
        this.orderArray = [];
        this.isLoading = true;
        this.isLoaded = false;
        this.fetchOrderData();
    }
    ngOnInit() { }
    fetchOrderData() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isLoaded = false;
            this.isLoading = true;
            this.orders = yield this.orderDataService.getOrderData();
            let count = 0;
            for (let orderId in this.orders) {
                count++;
                const orderObj = this.orders[orderId];
                const oia = [];
                for (let oi in orderObj.orderedItems) {
                    const o = {
                        name: orderObj.orderedItems[oi].name,
                        price: orderObj.orderedItems[oi].price,
                        quantity: orderObj.orderedItems[oi].quantity,
                    };
                    oia.push(o);
                }
                const obj = {
                    orderNo: count,
                    orderId: orderObj.orderId,
                    addedOn: orderObj.addedOn,
                    orderedItems: oia,
                    totalAmt: orderObj.totalAmt,
                };
                this.orderArray.push(obj);
            }
            // reverse it to show latest order first
            this.orderArray.reverse();
            this.isLoaded = true;
            this.isLoading = false;
        });
    }
    getItemTotalAmount(price, quantity) {
        return Number(price) * Number(quantity);
    }
}
OrderPageComponent.ɵfac = function OrderPageComponent_Factory(t) { return new (t || OrderPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_order_data_service__WEBPACK_IMPORTED_MODULE_2__["OrderDataService"])); };
OrderPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OrderPageComponent, selectors: [["app-order-page"]], decls: 9, vars: 3, consts: [[1, "my-order-page"], [1, "album", "py-5"], [1, "container"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], [4, "ngIf"], ["class", "text-center", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "text-center"], [1, "card", "mx-auto", 2, "max-width", "700px"], [1, "card-header"], [1, "card-body"], [1, "card-title"], [1, "card-text"]], template: function OrderPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "My orders");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OrderPageComponent_div_6_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, OrderPageComponent_div_7_Template, 3, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, OrderPageComponent_div_8_Template, 14, 5, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true && ctx.orderArray.length == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.orderArray);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_4__["LoaderComponent"]], styles: [".my-order-page[_ngcontent-%COMP%] {\r\n    min-height: 120vh;\r\n    padding-top: 80px;\r\n}\r\n\r\ndiv[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    margin-bottom: 20px;\r\n    font-size: 18px;\r\n}\r\n\r\n.card-header[_ngcontent-%COMP%] {\r\n    background-color: rgb(0 255 167 / 46%);\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLXBhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLGlCQUFpQjtJQUNqQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLHNDQUFzQztBQUMxQyIsImZpbGUiOiJvcmRlci1wYWdlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubXktb3JkZXItcGFnZSB7XHJcbiAgICBtaW4taGVpZ2h0OiAxMjB2aDtcclxuICAgIHBhZGRpbmctdG9wOiA4MHB4O1xyXG59XHJcblxyXG5kaXYge1xyXG4gICAgZm9udC1mYW1pbHk6IFwiS2FybGFcIiwgc2Fucy1zZXJpZjtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxufVxyXG5cclxuLmNhcmQtaGVhZGVyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigwIDI1NSAxNjcgLyA0NiUpO1xyXG59Il19 */"] });


/***/ }),

/***/ "raWv":
/*!****************************************************************!*\
  !*** ./src/app/admin/display-items/display-items.component.ts ***!
  \****************************************************************/
/*! exports provided: DisplayItemsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisplayItemsComponent", function() { return DisplayItemsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var src_app_services_item_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/item-data.service */ "vQsw");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _global_starters_icon_starters_icon_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../global/starters-icon/starters-icon.component */ "iKEw");
/* harmony import */ var _global_mains_icon_mains_icon_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../global/mains-icon/mains-icon.component */ "ygTu");
/* harmony import */ var _global_desserts_icon_desserts_icon_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../global/desserts-icon/desserts-icon.component */ "6JSh");
/* harmony import */ var _global_drinks_icon_drinks_icon_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../global/drinks-icon/drinks-icon.component */ "dVxj");
/* harmony import */ var _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../global/loader/loader.component */ "yPJz");










const _c0 = ["startersRef"];
const _c1 = ["mainsRef"];
const _c2 = ["dessertsRef"];
const _c3 = ["alcoholicBeveragesRef"];
const _c4 = function (a0) { return { "active": a0 }; };
function DisplayItemsComponent_nav_8_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nav", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "ul", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_nav_8_Template_a_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4); return ctx_r10.scrollTo(_r0, 1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "app-starters-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_nav_8_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](13); return ctx_r12.scrollTo(_r4, 2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "app-mains-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_nav_8_Template_a_click_10_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](16); return ctx_r13.scrollTo(_r6, 3); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "app-desserts-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "li", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_nav_8_Template_a_click_13_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](19); return ctx_r14.scrollTo(_r8, 4); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "app-drinks-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](4, _c4, ctx_r1.currentActive === 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](6, _c4, ctx_r1.currentActive === 2));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](8, _c4, ctx_r1.currentActive === 3));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](10, _c4, ctx_r1.currentActive === 4));
} }
function DisplayItemsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-loader");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function DisplayItemsComponent_div_11_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "small", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_11_div_5_Template_input_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18); const item_r16 = ctx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r17.setAvailabilityStatus(item_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Available?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_11_div_5_Template_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18); const item_r16 = ctx.$implicit; const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r19.onEdit(item_r16.category, item_r16.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r16.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r16.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r16.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r16.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", item_r16.isAvailable);
} }
function DisplayItemsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Starters");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DisplayItemsComponent_div_11_div_5_Template, 19, 5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r3.starters);
} }
function DisplayItemsComponent_div_14_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "small", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_14_div_5_Template_input_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23); const item_r21 = ctx.$implicit; const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r22.setAvailabilityStatus(item_r21); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Available?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_14_div_5_Template_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r23); const item_r21 = ctx.$implicit; const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r24.onEdit(item_r21.category, item_r21.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r21.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r21.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r21.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r21.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", item_r21.isAvailable);
} }
function DisplayItemsComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Mains");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DisplayItemsComponent_div_14_div_5_Template, 19, 5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r5.mains);
} }
function DisplayItemsComponent_div_17_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "small", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_17_div_5_Template_input_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28); const item_r26 = ctx.$implicit; const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r27.setAvailabilityStatus(item_r26); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Available?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_17_div_5_Template_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r28); const item_r26 = ctx.$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r29.onEdit(item_r26.category, item_r26.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r26.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r26.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r26.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r26.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", item_r26.isAvailable);
} }
function DisplayItemsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Desserts");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DisplayItemsComponent_div_17_div_5_Template, 19, 5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r7.desserts);
} }
function DisplayItemsComponent_div_20_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "small", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "input", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_20_div_5_Template_input_click_14_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r33); const item_r31 = ctx.$implicit; const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r32.setAvailabilityStatus(item_r31); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "label", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Available?");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_div_20_div_5_Template_button_click_17_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r33); const item_r31 = ctx.$implicit; const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r34.onEdit(item_r31.category, item_r31.id); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "Edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", item_r31.imageUrl, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r31.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](item_r31.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("\u20B9", item_r31.price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("checked", item_r31.isAvailable);
} }
function DisplayItemsComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Alcoholic Beverages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, DisplayItemsComponent_div_20_div_5_Template, 19, 5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r9.alcoholicBeverages);
} }
class DisplayItemsComponent {
    constructor(router, itemDataService, route) {
        this.router = router;
        this.itemDataService = itemDataService;
        this.route = route;
        this.starters = [];
        this.mains = [];
        this.alcoholicBeverages = [];
        this.desserts = [];
        this.isLoading = false;
        this.isLoaded = false;
        this.sectionName = '';
        this.showCategoryNavbar = false;
        this.startersOffset = null;
        this.mainsOffset = null;
        this.dessertsOffset = null;
        this.alcoholicBeveragesOffset = null;
        this.route.fragment.subscribe((data) => {
            this.sectionName = data;
        });
    }
    ngOnInit() {
        this.fetchItems();
    }
    ngAfterViewInit() {
        this.startersOffset = this.startersRef.nativeElement.offsetTop;
        this.mainsOffset = this.mainsRef.nativeElement.offsetTop;
        this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop;
        this.alcoholicBeveragesOffset =
            this.alcoholicBeveragesRef.nativeElement.offsetTop;
    }
    checkOffsetTop() {
        this.startersOffset = this.startersRef.nativeElement.offsetTop + 200;
        this.mainsOffset = this.mainsRef.nativeElement.offsetTop - 200;
        this.dessertsOffset = this.dessertsRef.nativeElement.offsetTop - 200;
        this.alcoholicBeveragesOffset =
            this.alcoholicBeveragesRef.nativeElement.offsetTop - 200;
        if (window.pageYOffset >= this.startersOffset &&
            window.pageYOffset < this.mainsOffset) {
            this.currentActive = 1;
            this.showCategoryNavbar = true;
        }
        else if (window.pageYOffset >= this.mainsOffset &&
            window.pageYOffset < this.dessertsOffset) {
            this.currentActive = 2;
            this.showCategoryNavbar = true;
        }
        else if (window.pageYOffset >= this.dessertsOffset &&
            window.pageYOffset < this.alcoholicBeveragesOffset) {
            this.currentActive = 3;
            this.showCategoryNavbar = true;
        }
        else if (window.pageYOffset >= this.alcoholicBeveragesOffset) {
            this.currentActive = 4;
            this.showCategoryNavbar = true;
        }
        else {
            this.currentActive = 0;
            this.showCategoryNavbar = false;
        }
    }
    scrollTo(el, v) {
        //el.scrollIntoView({ block: 'start', inline: 'nearest' });
        el.scrollIntoView();
        this.currentActive = v;
    }
    fetchItems() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                this.isLoading = true;
                this.starters = yield this.itemDataService.getItemsCategoryWise('starters');
                this.mains = yield this.itemDataService.getItemsCategoryWise('mains');
                this.alcoholicBeverages = yield this.itemDataService.getItemsCategoryWise('alcoholic-beverages');
                this.desserts = yield this.itemDataService.getItemsCategoryWise('desserts');
                this.isLoading = false;
                this.isLoaded = true;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    onEdit(itemCategory, itemId) {
        this.router.navigate(['admin/items/edit', itemCategory, itemId]);
    }
    onAdd() {
        this.router.navigate(['admin/items/add']);
    }
    setAvailabilityStatus(item) {
        const status = item.isAvailable;
        console.log(status);
        item.isAvailable = !status;
        this.itemDataService.setIsAvailable(!status, item.category, item.id);
    }
}
DisplayItemsComponent.ɵfac = function DisplayItemsComponent_Factory(t) { return new (t || DisplayItemsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_item_data_service__WEBPACK_IMPORTED_MODULE_3__["ItemDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"])); };
DisplayItemsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: DisplayItemsComponent, selectors: [["app-display-items"]], viewQuery: function DisplayItemsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c3, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.startersRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.mainsRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dessertsRef = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.alcoholicBeveragesRef = _t.first);
    } }, hostBindings: function DisplayItemsComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("scroll", function DisplayItemsComponent_scroll_HostBindingHandler($event) { return ctx.checkOffsetTop($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
    } }, decls: 21, vars: 6, consts: [[1, "album", "py-5"], [1, "container"], [1, "d-flex", "flex-row-reverse", 2, "margin-bottom", "30px"], ["startersRef", ""], [1, "p-2"], ["type", "button", 1, "btn", "btn-outline-primary", 3, "click"], ["class", "sticky-top category-navbar", 4, "ngIf"], ["class", "loader-div", 4, "ngIf"], ["id", "starters", 1, "section", 2, "scroll-margin-top", "0rem"], ["class", "items-div", 4, "ngIf"], ["id", "mains", 1, "section"], ["mainsRef", ""], ["id", "desserts", 1, "section"], ["dessertsRef", ""], ["id", "alcoholic-beverages", 1, "section"], ["alcoholicBeveragesRef", ""], [1, "sticky-top", "category-navbar"], [1, "nav", "nav-pills", "nav-justified", "text-light", "category-ul-nav"], [1, "nav-item"], [1, "nav-link", 3, "ngClass", "click"], [1, "loader-div"], [1, "items-div"], [1, "d-flex", "align-items-center", "pb-3", "mb-5", "border-bottom"], [1, "fs-2"], [1, "row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "g-3"], ["class", "col", 4, "ngFor", "ngForOf"], [1, "col"], [1, "card"], ["role", "img", "aria-label", "item-image", "preserveAspectRatio", "xMidYMid slice", "focusable", "false", 1, "img-loading", "card-img-top", 3, "src"], [1, "card-body"], [1, "card-text"], [1, "badge", "bg-light", "text-dark", "item-category"], [1, "d-flex", "justify-content-between", "align-items-center"], [1, "text-dark", "item-price"], [1, "btn-group"], [1, "form-check", "form-switch", 2, "margin-right", "10px"], ["type", "checkbox", "id", "flexSwitchCheckDefault", 1, "form-check-input", 3, "checked", "click"], ["for", "flexSwitchCheckDefault", 1, "form-check-label"], ["type", "button", 1, "btn", "btn-sm", "btn-outline-primary", 3, "click"]], template: function DisplayItemsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "main");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function DisplayItemsComponent_Template_button_click_6_listener() { return ctx.onAdd(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "Add a new item");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, DisplayItemsComponent_nav_8_Template, 15, 12, "nav", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, DisplayItemsComponent_div_9_Template, 2, 0, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "section", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, DisplayItemsComponent_div_11_Template, 6, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "section", 10, 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, DisplayItemsComponent_div_14_Template, 6, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "section", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, DisplayItemsComponent_div_17_Template, 6, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "section", 14, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, DisplayItemsComponent_div_20_Template, 6, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showCategoryNavbar == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading == true && ctx.isLoaded == false);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoaded == true);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgClass"], _global_starters_icon_starters_icon_component__WEBPACK_IMPORTED_MODULE_5__["StartersIconComponent"], _global_mains_icon_mains_icon_component__WEBPACK_IMPORTED_MODULE_6__["MainsIconComponent"], _global_desserts_icon_desserts_icon_component__WEBPACK_IMPORTED_MODULE_7__["DessertsIconComponent"], _global_drinks_icon_drinks_icon_component__WEBPACK_IMPORTED_MODULE_8__["DrinksIconComponent"], _global_loader_loader_component__WEBPACK_IMPORTED_MODULE_9__["LoaderComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]], styles: ["section[_ngcontent-%COMP%] {\r\n    scroll-margin-top: 6rem;\r\n}\r\n\r\nimg[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    height: 300px;\r\n    object-fit: cover;\r\n}\r\n\r\n.item-price[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n    color: black;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n    font-family: \"Karla\", sans-serif;\r\n    border-radius: 1.3em;\r\n}\r\n\r\n.card-img-top[_ngcontent-%COMP%] {\r\n    border-top-left-radius: 1.3em;\r\n    border-top-right-radius: 1.3em;\r\n}\r\n\r\n.card-text[_ngcontent-%COMP%] {\r\n    font-size: 20px;\r\n    color: black;\r\n}\r\n\r\n.item-category[_ngcontent-%COMP%] {\r\n    white-space: pre-wrap;\r\n    font-size: 14px;\r\n    margin-bottom: 10px;\r\n}\r\n\r\n.item-price[_ngcontent-%COMP%] {\r\n    margin-right: 10px;\r\n}\r\n\r\n.loader-div[_ngcontent-%COMP%] {\r\n    margin-top: 250px;\r\n    min-height: 60vh;\r\n}\r\n\r\n.img-loading[_ngcontent-%COMP%] {\r\n    background-color: #e2e2e2;\r\n    background-image: linear-gradient(0deg, #e2e2e2 0%, #f7f7f7 100%);\r\n}\r\n\r\ndiv.card[_ngcontent-%COMP%] {\r\n    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;\r\n}\r\n\r\ndiv.card[_ngcontent-%COMP%]:hover {\r\n    transform: translateY(-0.1rem) scale(1);\r\n    box-shadow: 0 0.5em 3rem -1rem rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.items-div[_ngcontent-%COMP%] {\r\n    margin-bottom: 80px;\r\n}\r\n\r\n.category-navbar[_ngcontent-%COMP%] {\r\n    background-color: white;\r\n    color: black;\r\n    padding-top: 10px;\r\n    padding-bottom: 10px;\r\n    margin-top: 80px;\r\n    margin-bottom: 80px;\r\n    border-bottom-left-radius: 0.5em;\r\n    border-bottom-right-radius: 0.5em;\r\n    font-size: 18px;\r\n    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;\r\n}\r\n\r\n.nav-pills[_ngcontent-%COMP%]   .nav-link.active[_ngcontent-%COMP%], .nav-pills[_ngcontent-%COMP%]   .show[_ngcontent-%COMP%] > .nav-link[_ngcontent-%COMP%] {\r\n    color: rgb(255, 255, 255);\r\n    background-color: #e7e7e7d8;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%] {\r\n    color: #000000;\r\n}\r\n\r\n\r\n\r\n@media (min-width: 481px) and (max-width: 767px) {\r\n    .nav-link[_ngcontent-%COMP%] {\r\n        padding-top: 0.5rem;\r\n        padding-right: 0.5rem;\r\n        padding-bottom: 0.5rem;\r\n        padding-left: 0.5rem;\r\n    }\r\n    .category-navbar[_ngcontent-%COMP%] {\r\n        font-size: 15px;\r\n    }\r\n}\r\n\r\n.form-switch[_ngcontent-%COMP%] {\r\n    word-break: break-word;\r\n}\r\n\r\n.form-check-label[_ngcontent-%COMP%] {\r\n    font-size: 14px;\r\n}\r\n\r\n.form-check-input[_ngcontent-%COMP%]:checked {\r\n    background-color: #33ea00;\r\n    border-color: #33ea00;\r\n}\r\n\r\n\r\n\r\n@media (min-width: 320px) and (max-width: 480px) {\r\n    .nav-link[_ngcontent-%COMP%] {\r\n        padding-top: 0.5rem;\r\n        padding-right: 0.5rem;\r\n        padding-bottom: 0.5rem;\r\n        padding-left: 0.5rem;\r\n    }\r\n    .category-navbar[_ngcontent-%COMP%] {\r\n        font-size: 15px;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc3BsYXktaXRlbXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxhQUFhO0lBQ2IsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxnQ0FBZ0M7SUFDaEMsb0JBQW9CO0FBQ3hCOztBQUVBO0lBQ0ksNkJBQTZCO0lBQzdCLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGVBQWU7SUFDZixZQUFZO0FBQ2hCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLGVBQWU7SUFDZixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLGlFQUFpRTtBQUNyRTs7QUFFQTtJQUNJLGlEQUFpRDtBQUNyRDs7QUFFQTtJQUNJLHVDQUF1QztJQUN2QyxpREFBaUQ7QUFDckQ7O0FBRUE7SUFDSSxtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsaUNBQWlDO0lBQ2pDLGVBQWU7SUFDZixtREFBbUQ7QUFDdkQ7O0FBRUE7O0lBRUkseUJBQXlCO0lBQ3pCLDJCQUEyQjtBQUMvQjs7QUFFQTtJQUNJLGNBQWM7QUFDbEI7O0FBR0E7OztDQUdDOztBQUVEO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIscUJBQXFCO1FBQ3JCLHNCQUFzQjtRQUN0QixvQkFBb0I7SUFDeEI7SUFDQTtRQUNJLGVBQWU7SUFDbkI7QUFDSjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIscUJBQXFCO0FBQ3pCOztBQUdBOzs7Q0FHQzs7QUFFRDtJQUNJO1FBQ0ksbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixzQkFBc0I7UUFDdEIsb0JBQW9CO0lBQ3hCO0lBQ0E7UUFDSSxlQUFlO0lBQ25CO0FBQ0oiLCJmaWxlIjoiZGlzcGxheS1pdGVtcy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsic2VjdGlvbiB7XHJcbiAgICBzY3JvbGwtbWFyZ2luLXRvcDogNnJlbTtcclxufVxyXG5cclxuaW1nIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAzMDBweDtcclxuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xyXG59XHJcblxyXG4uaXRlbS1wcmljZSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5jYXJkIHtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkthcmxhXCIsIHNhbnMtc2VyaWY7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxLjNlbTtcclxufVxyXG5cclxuLmNhcmQtaW1nLXRvcCB7XHJcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxLjNlbTtcclxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxLjNlbTtcclxufVxyXG5cclxuLmNhcmQtdGV4dCB7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbn1cclxuXHJcbi5pdGVtLWNhdGVnb3J5IHtcclxuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbn1cclxuXHJcbi5pdGVtLXByaWNlIHtcclxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcclxufVxyXG5cclxuLmxvYWRlci1kaXYge1xyXG4gICAgbWFyZ2luLXRvcDogMjUwcHg7XHJcbiAgICBtaW4taGVpZ2h0OiA2MHZoO1xyXG59XHJcblxyXG4uaW1nLWxvYWRpbmcge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UyZTJlMjtcclxuICAgIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgwZGVnLCAjZTJlMmUyIDAlLCAjZjdmN2Y3IDEwMCUpO1xyXG59XHJcblxyXG5kaXYuY2FyZCB7XHJcbiAgICBib3gtc2hhZG93OiByZ2JhKDE0OSwgMTU3LCAxNjUsIDAuMikgMHB4IDhweCAyNHB4O1xyXG59XHJcblxyXG5kaXYuY2FyZDpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTAuMXJlbSkgc2NhbGUoMSk7XHJcbiAgICBib3gtc2hhZG93OiAwIDAuNWVtIDNyZW0gLTFyZW0gcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG59XHJcblxyXG4uaXRlbXMtZGl2IHtcclxuICAgIG1hcmdpbi1ib3R0b206IDgwcHg7XHJcbn1cclxuXHJcbi5jYXRlZ29yeS1uYXZiYXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBjb2xvcjogYmxhY2s7XHJcbiAgICBwYWRkaW5nLXRvcDogMTBweDtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogODBweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDgwcHg7XHJcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwLjVlbTtcclxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwLjVlbTtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xNSkgMS45NXB4IDEuOTVweCAyLjZweDtcclxufVxyXG5cclxuLm5hdi1waWxscyAubmF2LWxpbmsuYWN0aXZlLFxyXG4ubmF2LXBpbGxzIC5zaG93Pi5uYXYtbGluayB7XHJcbiAgICBjb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZTdlN2Q4O1xyXG59XHJcblxyXG4ubmF2LWxpbmsge1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbn1cclxuXHJcblxyXG4vKlxyXG4jI0RldmljZSA9IExvdyBSZXNvbHV0aW9uIFRhYmxldHMsIE1vYmlsZXMgKExhbmRzY2FwZSlcclxuIyNTY3JlZW4gPSBCL3cgNDgxcHggdG8gNzY3cHhcclxuKi9cclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XHJcbiAgICAubmF2LWxpbmsge1xyXG4gICAgICAgIHBhZGRpbmctdG9wOiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1yaWdodDogMC41cmVtO1xyXG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XHJcbiAgICB9XHJcbiAgICAuY2F0ZWdvcnktbmF2YmFyIHtcclxuICAgICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbi5mb3JtLXN3aXRjaCB7XHJcbiAgICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xyXG59XHJcblxyXG4uZm9ybS1jaGVjay1sYWJlbCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbn1cclxuXHJcbi5mb3JtLWNoZWNrLWlucHV0OmNoZWNrZWQge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMzZWEwMDtcclxuICAgIGJvcmRlci1jb2xvcjogIzMzZWEwMDtcclxufVxyXG5cclxuXHJcbi8qIFxyXG4jI0RldmljZSA9IE1vc3Qgb2YgdGhlIFNtYXJ0cGhvbmVzIE1vYmlsZXMgKFBvcnRyYWl0KVxyXG4jI1NjcmVlbiA9IEIvdyAzMjBweCB0byA0NzlweFxyXG4qL1xyXG5cclxuQG1lZGlhIChtaW4td2lkdGg6IDMyMHB4KSBhbmQgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAgIC5uYXYtbGluayB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IDAuNXJlbTtcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XHJcbiAgICAgICAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDAuNXJlbTtcclxuICAgIH1cclxuICAgIC5jYXRlZ29yeS1uYXZiYXIge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIH1cclxufSJdfQ== */"] });


/***/ }),

/***/ "vQsw":
/*!***********************************************!*\
  !*** ./src/app/services/item-data.service.ts ***!
  \***********************************************/
/*! exports provided: ItemDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemDataService", function() { return ItemDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/fire/database */ "sSZD");






class ItemDataService {
    constructor(http, afdb) {
        this.http = http;
        this.afdb = afdb;
    }
    // adds item data to Firebase DB
    addItemData(itemData) {
        this.item = itemData;
        const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL +
            '/items/' +
            itemData.category +
            '.json';
        return this.http.post(path, itemData);
    }
    // sets item id in Firebase DB
    setItemId(idParam) {
        let modifiedIdParam;
        if (this.item.category === 'starters') {
            modifiedIdParam = 'S' + idParam;
        }
        else if (this.item.category === 'mains') {
            modifiedIdParam = 'M' + idParam;
        }
        else if (this.item.category === 'alcoholic-beverages') {
            modifiedIdParam = 'AB' + idParam;
        }
        else if (this.item.category === 'desserts') {
            modifiedIdParam = 'D' + idParam;
        }
        const itemRef = this.afdb.object('items/' + this.item.category + '/' + idParam);
        itemRef.update({ id: modifiedIdParam });
    }
    /** get item by category */
    getItemsCategoryWise(category) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL + '/items/' + category + '.json';
            return yield this.http
                .get(path)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((responseData) => {
                const itemsArray = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        itemsArray.push(responseData[key]);
                    }
                }
                return itemsArray;
            }))
                .toPromise();
        });
    }
    /** get item by id */
    getItemById(category, id) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const pathItemId = this.getPathItemId(id);
            const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL +
                '/items/' +
                category +
                '/' +
                pathItemId +
                '.json';
            return yield this.http
                .get(path)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((data) => {
                return data;
            }))
                .toPromise();
        });
    }
    /** delete item data from Firebase DB */
    deleteItemData(itemCategory, itemId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const pathItemId = this.getPathItemId(itemId);
            const itemRef = this.afdb.object('items/' + itemCategory + '/' + pathItemId);
            return yield itemRef.remove();
        });
    }
    /** delete imageUrl value when image deleted from storage */
    deleteImageUrl(itemCategory, itemId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const pathItemId = this.getPathItemId(itemId);
            const itemRef = this.afdb.object('items/' + itemCategory + '/' + pathItemId);
            return yield itemRef.update({ imageUrl: '' });
        });
    }
    /** update item data */
    updateItemData(item, itemCategory, itemId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const pathItemId = this.getPathItemId(itemId);
            const itemRef = this.afdb.object('items/' + itemCategory + '/' + pathItemId);
            return yield itemRef.update(item);
        });
    }
    /** set/toggle item availability status */
    setIsAvailable(v, itemCategory, itemId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const pathItemId = this.getPathItemId(itemId);
            const itemRef = this.afdb.object('items/' + itemCategory + '/' + pathItemId);
            return yield itemRef.update({ isAvailable: v });
        });
    }
    /** checks item availability status before confirm order */
    reportItemAvailability(orders) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let notAvailableItems = [];
            for (let i in orders) {
                const obj = yield this.getItemById(orders[i].category, orders[i].id);
                if (obj.isAvailable == false) {
                    notAvailableItems.push({ name: obj.name, id: obj.id });
                }
            }
            return notAvailableItems;
        });
    }
    /** utilities */
    getPathItemId(itemId) {
        let pathItemId = '';
        if (!itemId.startsWith('-')) {
            let parts = itemId.split('-');
            for (let i = 1; i < parts.length; i++) {
                pathItemId += '-' + parts[i];
            }
        }
        else {
            pathItemId = itemId;
        }
        return pathItemId;
    }
    /** utilities end */
    getAllItems() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const path = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].firebase.databaseURL + '/items.json';
            let res;
            return yield this.http
                .get(path)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])((responseData) => {
                const itemsArray = [];
                for (const category in responseData) {
                    if (responseData.hasOwnProperty(category)) {
                        for (const item in responseData[category]) {
                            itemsArray.push(responseData[category][item]);
                        }
                    }
                }
                return itemsArray;
            }))
                .toPromise();
        });
    }
}
ItemDataService.ɵfac = function ItemDataService_Factory(t) { return new (t || ItemDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_fire_database__WEBPACK_IMPORTED_MODULE_5__["AngularFireDatabase"])); };
ItemDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: ItemDataService, factory: ItemDataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home/home.component */ "9vUh");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/login/login.component */ "bsvf");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/signup/signup.component */ "SBxm");
/* harmony import */ var _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-profile/user-profile.component */ "/de2");
/* harmony import */ var _admin_display_items_display_items_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./admin/display-items/display-items.component */ "raWv");
/* harmony import */ var _admin_add_or_edit_items_add_or_edit_items_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./admin/add-or-edit-items/add-or-edit-items.component */ "J0Of");
/* harmony import */ var _global_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/not-found/not-found.component */ "fEtg");
/* harmony import */ var _category_page_category_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./category-page/category-page.component */ "PnL/");
/* harmony import */ var _cart_page_cart_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cart-page/cart-page.component */ "/xLE");
/* harmony import */ var _order_page_order_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order-page/order-page.component */ "rTIa");
/* harmony import */ var _route_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./route-guards/auth-guard.service */ "Li/Y");
/* harmony import */ var _route_guards_admin_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./route-guards/admin-auth-guard.service */ "cqXK");
/* harmony import */ var _confirm_order_confirm_order_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./confirm-order/confirm-order.component */ "mArq");
/* harmony import */ var _admin_manage_orders_manage_orders_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./admin/manage-orders/manage-orders.component */ "8YET");
/* harmony import */ var _admin_display_orders_display_orders_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./admin/display-orders/display-orders.component */ "4hB0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");


















const routerOptions = {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 100]
};
const routes = [
    {
        path: '',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_1__["HomeComponent"],
    },
    {
        path: 'login',
        component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"],
    },
    {
        path: 'sign-up',
        component: _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_3__["SignupComponent"],
    },
    {
        path: 'profile/:name',
        component: _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_4__["UserProfileComponent"],
        canActivate: [_route_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]]
    },
    {
        path: 'admin/items',
        component: _admin_display_items_display_items_component__WEBPACK_IMPORTED_MODULE_5__["DisplayItemsComponent"],
        canActivate: [_route_guards_admin_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AdminAuthGuard"]]
    },
    {
        path: 'admin/items/add',
        component: _admin_add_or_edit_items_add_or_edit_items_component__WEBPACK_IMPORTED_MODULE_6__["AddOrEditItemsComponent"],
        data: { path: 'add' },
        canActivate: [_route_guards_admin_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AdminAuthGuard"]]
    },
    {
        path: 'admin/items/edit/:itemCategory/:itemId',
        component: _admin_add_or_edit_items_add_or_edit_items_component__WEBPACK_IMPORTED_MODULE_6__["AddOrEditItemsComponent"],
        data: { path: 'edit' },
        canActivate: [_route_guards_admin_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AdminAuthGuard"]]
    },
    {
        path: 'admin/manage-orders',
        component: _admin_manage_orders_manage_orders_component__WEBPACK_IMPORTED_MODULE_14__["ManageOrdersComponent"],
        canActivate: [_route_guards_admin_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AdminAuthGuard"]]
    },
    {
        path: 'admin/:uid/orders',
        component: _admin_display_orders_display_orders_component__WEBPACK_IMPORTED_MODULE_15__["DisplayOrdersComponent"],
        canActivate: [_route_guards_admin_auth_guard_service__WEBPACK_IMPORTED_MODULE_12__["AdminAuthGuard"]]
    },
    {
        path: 'menu-page',
        component: _category_page_category_page_component__WEBPACK_IMPORTED_MODULE_8__["CategoryPageComponent"]
    },
    {
        path: 'cart',
        component: _cart_page_cart_page_component__WEBPACK_IMPORTED_MODULE_9__["CartPageComponent"]
    },
    {
        path: 'orders',
        component: _order_page_order_page_component__WEBPACK_IMPORTED_MODULE_10__["OrderPageComponent"],
        canActivate: [_route_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]]
    },
    {
        path: 'confirm-order',
        component: _confirm_order_confirm_order_component__WEBPACK_IMPORTED_MODULE_13__["ConfirmOrderComponent"],
        canActivate: [_route_guards_auth_guard_service__WEBPACK_IMPORTED_MODULE_11__["AuthGuard"]]
    },
    {
        path: 'not-found',
        component: _global_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_7__["NotFoundComponent"],
    },
    {
        path: '**',
        redirectTo: 'not-found',
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes, routerOptions)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "wW1b":
/*!********************************************************!*\
  !*** ./src/app/services/fetch-header-image.service.ts ***!
  \********************************************************/
/*! exports provided: FetchHeaderImageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchHeaderImageService", function() { return FetchHeaderImageService; });
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/environments/environment */ "AytR");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



class FetchHeaderImageService {
    constructor(http) {
        this.http = http;
    }
    ngOnInit() { }
    fetchImage() {
        return this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_0__["environment"].UNSPLASH_SOURCE_API);
    }
}
FetchHeaderImageService.ɵfac = function FetchHeaderImageService_Factory(t) { return new (t || FetchHeaderImageService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
FetchHeaderImageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: FetchHeaderImageService, factory: FetchHeaderImageService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "yPJz":
/*!***************************************************!*\
  !*** ./src/app/global/loader/loader.component.ts ***!
  \***************************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class LoaderComponent {
    constructor() { }
    ngOnInit() {
    }
}
LoaderComponent.ɵfac = function LoaderComponent_Factory(t) { return new (t || LoaderComponent)(); };
LoaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: LoaderComponent, selectors: [["app-loader"]], decls: 2, vars: 0, consts: [[1, "loader"]], template: function LoaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Loading...");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".loader[_ngcontent-%COMP%], .loader[_ngcontent-%COMP%]:before, .loader[_ngcontent-%COMP%]:after {\r\n    border-radius: 50%;\r\n    width: 2.5em;\r\n    height: 2.5em;\r\n    animation-fill-mode: both;\r\n    animation: load7 1.8s infinite ease-in-out;\r\n}\r\n\r\n.loader[_ngcontent-%COMP%] {\r\n    color: #707070;\r\n    font-size: 10px;\r\n    margin: 80px auto;\r\n    position: relative;\r\n    text-indent: -9999em;\r\n    transform: translateZ(0);\r\n    animation-delay: -0.16s;\r\n}\r\n\r\n.loader[_ngcontent-%COMP%]:before, .loader[_ngcontent-%COMP%]:after {\r\n    content: '';\r\n    position: absolute;\r\n    top: 0;\r\n}\r\n\r\n.loader[_ngcontent-%COMP%]:before {\r\n    left: -3.5em;\r\n    animation-delay: -0.32s;\r\n}\r\n\r\n.loader[_ngcontent-%COMP%]:after {\r\n    left: 3.5em;\r\n}\r\n\r\n@keyframes load7 {\r\n    0%,\r\n    80%,\r\n    100% {\r\n        box-shadow: 0 2.5em 0 -1.3em;\r\n    }\r\n    40% {\r\n        box-shadow: 0 2.5em 0 0;\r\n    }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7SUFHSSxrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLGFBQWE7SUFFYix5QkFBeUI7SUFFekIsMENBQTBDO0FBQzlDOztBQUVBO0lBQ0ksY0FBYztJQUNkLGVBQWU7SUFDZixpQkFBaUI7SUFDakIsa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUdwQix3QkFBd0I7SUFFeEIsdUJBQXVCO0FBQzNCOztBQUVBOztJQUVJLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsTUFBTTtBQUNWOztBQUVBO0lBQ0ksWUFBWTtJQUVaLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLFdBQVc7QUFDZjs7QUFhQTtJQUNJOzs7UUFHSSw0QkFBNEI7SUFDaEM7SUFDQTtRQUNJLHVCQUF1QjtJQUMzQjtBQUNKIiwiZmlsZSI6ImxvYWRlci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvYWRlcixcclxuLmxvYWRlcjpiZWZvcmUsXHJcbi5sb2FkZXI6YWZ0ZXIge1xyXG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gICAgd2lkdGg6IDIuNWVtO1xyXG4gICAgaGVpZ2h0OiAyLjVlbTtcclxuICAgIC13ZWJraXQtYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcclxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XHJcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogbG9hZDcgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAgIGFuaW1hdGlvbjogbG9hZDcgMS44cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxufVxyXG5cclxuLmxvYWRlciB7XHJcbiAgICBjb2xvcjogIzcwNzA3MDtcclxuICAgIGZvbnQtc2l6ZTogMTBweDtcclxuICAgIG1hcmdpbjogODBweCBhdXRvO1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgdGV4dC1pbmRlbnQ6IC05OTk5ZW07XHJcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWigwKTtcclxuICAgIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVooMCk7XHJcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMTZzO1xyXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4xNnM7XHJcbn1cclxuXHJcbi5sb2FkZXI6YmVmb3JlLFxyXG4ubG9hZGVyOmFmdGVyIHtcclxuICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG59XHJcblxyXG4ubG9hZGVyOmJlZm9yZSB7XHJcbiAgICBsZWZ0OiAtMy41ZW07XHJcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1kZWxheTogLTAuMzJzO1xyXG4gICAgYW5pbWF0aW9uLWRlbGF5OiAtMC4zMnM7XHJcbn1cclxuXHJcbi5sb2FkZXI6YWZ0ZXIge1xyXG4gICAgbGVmdDogMy41ZW07XHJcbn1cclxuXHJcbkAtd2Via2l0LWtleWZyYW1lcyBsb2FkNyB7XHJcbiAgICAwJSxcclxuICAgIDgwJSxcclxuICAgIDEwMCUge1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMi41ZW0gMCAtMS4zZW07XHJcbiAgICB9XHJcbiAgICA0MCUge1xyXG4gICAgICAgIGJveC1zaGFkb3c6IDAgMi41ZW0gMCAwO1xyXG4gICAgfVxyXG59XHJcblxyXG5Aa2V5ZnJhbWVzIGxvYWQ3IHtcclxuICAgIDAlLFxyXG4gICAgODAlLFxyXG4gICAgMTAwJSB7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAyLjVlbSAwIC0xLjNlbTtcclxuICAgIH1cclxuICAgIDQwJSB7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAyLjVlbSAwIDA7XHJcbiAgICB9XHJcbn0iXX0= */"] });


/***/ }),

/***/ "ygTu":
/*!***********************************************************!*\
  !*** ./src/app/global/mains-icon/mains-icon.component.ts ***!
  \***********************************************************/
/*! exports provided: MainsIconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainsIconComponent", function() { return MainsIconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class MainsIconComponent {
    constructor() { }
    ngOnInit() {
    }
}
MainsIconComponent.ɵfac = function MainsIconComponent_Factory(t) { return new (t || MainsIconComponent)(); };
MainsIconComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MainsIconComponent, selectors: [["app-mains-icon"]], decls: 45, vars: 0, consts: [["version", "1.1", "height", "35", "width", "35", "id", "Capa_1", "xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "x", "0px", "y", "0px", "viewBox", "0 0 480 480", 0, "xml", "space", "preserve", 2, "enable-background", "new 0 0 480 480"], ["d", "M339.904,161.776l-5.136-16.904c-6.524-19.202-27.379-29.479-46.581-22.955c-10.802,3.67-19.285,12.153-22.955,22.955\n\t\t\tl-5.136,16.904c-4.322,14.256-5.229,29.329-2.648,44c2.354,12.352,10.196,22.964,21.312,28.84L273.008,363.2\n\t\t\tc-0.77,7.177,1.558,14.342,6.4,19.696c10.413,11.39,28.089,12.182,39.479,1.769c0.616-0.563,1.206-1.153,1.769-1.769\n\t\t\tc4.734-5.202,7.058-12.157,6.4-19.16L321.272,234.6c11.101-5.879,18.93-16.484,21.28-28.824\n\t\t\tC345.133,191.105,344.226,176.032,339.904,161.776z M326.792,202.992c-1.732,8.874-8.056,16.155-16.6,19.112\n\t\t\tc-3.243,1.219-5.332,4.387-5.176,7.848L311.096,365c0.28,2.649-0.594,5.29-2.4,7.248c-4.817,4.769-12.575,4.769-17.392,0\n\t\t\tc-1.896-2.116-2.757-4.964-2.352-7.776l6.032-134.52c0.156-3.461-1.933-6.629-5.176-7.848c-8.544-2.957-14.868-10.238-16.6-19.112\n\t\t\tc-2.14-12.18-1.386-24.693,2.2-36.528l5.136-16.912c3.974-10.745,15.906-16.234,26.652-12.26c5.681,2.101,10.159,6.58,12.26,12.26\n\t\t\tl5.136,16.912C328.174,178.3,328.928,190.812,326.792,202.992z"], ["d", "M216,120c-4.418,0-8,3.582-8,8v68.688l-21.656,21.656c-1.602,1.596-2.454,3.797-2.344,6.056l7,140\n\t\t\tc0.167,3.019-0.929,5.972-3.024,8.152c-4.379,4.418-11.511,4.45-15.93,0.07c-0.024-0.023-0.047-0.047-0.07-0.07\n\t\t\tc-2.096-2.18-3.191-5.133-3.024-8.152l7.048-140c0.112-2.258-0.737-4.458-2.336-6.056L152,196.688V128c0-4.418-3.582-8-8-8\n\t\t\ts-8,3.582-8,8v72c0,2.122,0.844,4.156,2.344,5.656l21.488,21.496l-6.824,136.472c-0.726,14.907,10.77,27.581,25.677,28.307\n\t\t\tc14.907,0.726,27.581-10.77,28.307-25.677c0.043-0.876,0.043-1.753,0-2.629l-6.824-136.472l21.488-21.496\n\t\t\tc1.5-1.5,2.344-3.534,2.344-5.656v-72C224,123.582,220.418,120,216,120z"], ["d", "M168,120c-4.418,0-8,3.582-8,8v64c0,4.418,3.582,8,8,8s8-3.582,8-8v-64C176,123.582,172.418,120,168,120z"], ["d", "M192,120c-4.418,0-8,3.582-8,8v64c0,4.418,3.582,8,8,8s8-3.582,8-8v-64C200,123.582,196.418,120,192,120z"], ["d", "M240,0C107.452,0,0,107.452,0,240s107.452,240,240,240s240-107.452,240-240C479.85,107.514,372.486,0.15,240,0z M240,464\n\t\t\tC116.288,464,16,363.712,16,240S116.288,16,240,16s224,100.288,224,224C463.859,363.653,363.653,463.859,240,464z"], ["d", "M265.969,390.172c-0.429-4.397-4.342-7.614-8.74-7.185c-0.103,0.01-0.206,0.022-0.309,0.036l0.032-0.008\n\t\t\tc-11.263,1.308-22.641,1.308-33.904,0c-4.39-0.515-8.365,2.626-8.88,7.016c-0.515,4.39,2.626,8.365,7.016,8.88\n\t\t\tc12.491,1.459,25.109,1.459,37.6,0C263.181,398.483,266.398,394.57,265.969,390.172z"], ["d", "M362.4,136.912c-2.839-3.385-7.885-3.828-11.27-0.988c-0.011,0.009-0.022,0.019-0.034,0.028\n\t\t\tc-3.377,2.848-3.807,7.894-0.96,11.272c48.235,57.26,44.545,141.929-8.488,194.776c-3.13,3.119-3.139,8.186-0.02,11.316\n\t\t\tc3.119,3.13,8.186,3.139,11.316,0.02C411.881,294.623,415.991,200.541,362.4,136.912z"], ["d", "M186.392,105.744c-0.005,0-0.01-0.001-0.015-0.001c-0.008,0-0.016,0.001-0.025,0.001H186.392z"], ["d", "M277.736,84.472c-31.265-7.493-64.055-5.479-94.168,5.784c-4.136,1.555-6.227,6.169-4.672,10.304\n\t\t\t\tc1.172,3.117,4.152,5.18,7.481,5.183c0.957-0.005,1.905-0.18,2.799-0.519c27.118-10.141,56.646-11.952,84.8-5.2\n\t\t\t\tc4.295,1.038,8.618-1.601,9.656-5.896C284.67,89.833,282.031,85.51,277.736,84.472z"], ["d", "M137.992,341.6C111.023,314.677,95.908,278.108,96,240c-0.079-30.446,9.565-60.122,27.528-84.704\n\t\t\tc2.655-3.532,1.944-8.547-1.588-11.202s-8.547-1.944-11.202,1.588c-0.047,0.063-0.093,0.126-0.138,0.19\n\t\t\tc-46.253,63.588-39.447,151.359,16.056,207.056c3.128,3.13,8.202,3.132,11.332,0.004C141.118,349.804,141.12,344.73,137.992,341.6\n\t\t\tz"]], template: function MainsIconComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "path", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "path", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "path", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "path", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "path", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "path", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "path", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "path", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "path", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](32, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](33, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](34, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](35, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](36, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](39, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](40, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](41, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](42, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](43, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](44, "g");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJtYWlucy1pY29uLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map