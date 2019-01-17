import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService {
    constructor(private apiService:ApiService) {
    }

    // SignUp
    userSignup(data):Observable<any> {
        return this.apiService.post('/user', data).pipe(map(data => {
            return data;
        }));
    }

    // Login
    userLogin(data):Observable<any> {
        return this.apiService.post('/login', data).pipe(map(data => {
            return data;
        }));
    }

    // forgotPassword
    forgotPassword(data):Observable<any> {
        return this.apiService.post('/recovery', data).pipe(map(data => {
            return data;
        }));
    }

    // resetPassword
    resetPassword(data):Observable<any> {
        return this.apiService.post('/reset', data).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific User
    getSpecificUser(id):Observable<any> {
        return this.apiService.get('/user/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get Franchise User
    getFranchiseUser(id, searchData, status,  pageNo):Observable<any> {
        return this.apiService.get('/franchise/' + id + '?st=' + encodeURIComponent(searchData) + '&status=' + status + '&page=' + pageNo).pipe(map(data => {
            return data;
        }));
    }

    // Get Vehicle List of the specific Drivers
    getVehicle(id, searchData, pageNo):Observable<any> {
        return this.apiService.get('/vehicles/' + id + '?st=' + searchData + '&page=' + pageNo).pipe(map(data => {
            return data;
        }));
    }

    // Get All MVR Orders
    mvrOrders(order, searchData, pageNo):Observable<any> {
        return this.apiService.get('/mvr_orders_list' + '?st=' + searchData + '&page=' + pageNo).pipe(map(data => {
            return data;
        }));
    }

    // Get MVR Orders Status
    mvrStatus(order, searchData, pageNo):Observable<any> {
        return this.apiService.get('/mvr_status_data' + '?order_status=' + order + '&st=' + searchData + '&page=' + pageNo).pipe(map(data => {
            return data;
        }));
    }

    // Get Franchise Driver List
    getFranchiseDriverList(id, searchData, pageNo, pagelimit):Observable<any> {
        return this.apiService.get('/drivers' + '?st=' + encodeURIComponent(searchData) + '&page=' + pageNo + '&page_limit=' + pagelimit).pipe(map(data => {
            return data;
        }));
    }

    // Get Franchise Store details
    getFranchiseStoreDetails(id, searchData, pageNo, pagelimit):Observable<any> {
        return this.apiService.get('/franchise/' + id + '/store' + '?st=' + searchData + '&page=' + pageNo + '&page_limit=' + pagelimit).pipe(map(data => {
            return data;
        }));
    }

    // Get comapny List
    getCompanyList(id):Observable<any> {
        return this.apiService.get('/franchise/' + id + '/company_list').pipe(map(data => {
            return data;
        }));
    }

    // Get Store List
    getStoreList(id):Observable<any> {
        return this.apiService.get('/franchise/' + id + '/store_list').pipe(map(data => {
            return data;
        }));
    }
    // Get Comapny and Store List
    getCompanyStore(id):Observable<any> {
        return this.apiService.get('/company_store_list/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific Company
    getCompanyUser(id, searchData, pageNo):Observable<any> {
        return this.apiService.get('/franchise/' + id + '/company' + '?st=' + searchData + '&page=' + pageNo).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific Franchise User
    getSpecificFranchise(id):Observable<any> {
        return this.apiService.get('/franchise/user/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific Company
    getSpecificCompany(id):Observable<any> {
        return this.apiService.get('/franchise/company/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific Driver
    getSpecificDriver(id):Observable<any> {
        return this.apiService.get('/franchise/driver/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific Store
    getSpecificStore(id):Observable<any> {
        return this.apiService.get('/franchise/store/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get Specific Vehicle
    getVehicleDetails(id):Observable<any> {
        return this.apiService.get('/vehicle/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Get file List
    uploadedFileList(id, searchData, pageNo):Observable<any> {
        return this.apiService.get('/upload_file/' + id + '?st=' + searchData + '&page=' + pageNo).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific User
    deleteSpecificFranchise(id):Observable<any> {
        return this.apiService.delete('/franchise/user/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific File
    deleteSpecificFile(id):Observable<any> {
        return this.apiService.delete('/upload_file/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific Vehicle
    deleteSpecificVehicle(id):Observable<any> {
        return this.apiService.delete('/vehicle/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific Company
    deleteSpecificCompany(id):Observable<any> {
        return this.apiService.delete('/franchise/company/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific Driver
    deleteSpecificDriver(id):Observable<any> {
        return this.apiService.delete('/franchise/driver/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific Driver
    activeInactiveDriver(data, id):Observable<any> {
        return this.apiService.put('/franchise/driver/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific User
    activeInactiveUser(data, id):Observable<any> {
        return this.apiService.put('/franchise/user/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Delete Specific Store
    deleteSpecificStore(id):Observable<any> {
        return this.apiService.delete('/franchise/store/' + id).pipe(map(data => {
            return data;
        }));
    }

    // Order Mvr
    orderMvr(data):Observable<any> {
        return this.apiService.post('/mvr_order', data).pipe(map(data => {
            return data;
        }));
    }

    // Add User
    addUser(data):Observable<any> {
        return this.apiService.post('/franchise/user', data).pipe(map(data => {
            return data;
        }));
    }

    // Add File
    addFile(data, id):Observable<any> {
        return this.apiService.post('/upload_file/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Add Company
    addCompany(data):Observable<any> {
        return this.apiService.post('/franchise/company', data).pipe(map(data => {
            return data;
        }));
    }

    // Add Store
    addStore(data):Observable<any> {
        return this.apiService.post('/franchise/store', data).pipe(map(data => {
            return data;
        }));
    }

    // Add Driver
    addDriver(data):Observable<any> {
        return this.apiService.post('/franchise/driver', data).pipe(map(data => {
            return data;
        }));
    }

    // Add Vehicle
    addVehicle(data):Observable<any> {
        return this.apiService.post('/vehicle', data).pipe(map(data => {
            return data;
        }));
    }

    // Update User
    updateUser(data, id):Observable<any> {
        return this.apiService.put('/franchise/user/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Update Company
    updateCompany(data, id):Observable<any> {
        return this.apiService.put('/franchise/company/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Update Store
    updateStore(data, id):Observable<any> {
        return this.apiService.put('/franchise/store/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Update Driver
    updateDriver(data, id):Observable<any> {
        return this.apiService.put('/franchise/driver/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Update Vehicle
    updateVehicle(data, id):Observable<any> {
        return this.apiService.put('/vehicle/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Change Password
    changePassword(data, id):Observable<any> {
        return this.apiService.put('/franchise/user/password/' + id, data).pipe(map(data => {
            return data;
        }));
    }

    // Log Out
    logOut():Observable<any> {
        return this.apiService.post('/logout').pipe(map(data => {
            return data;
        }));
    }
}
