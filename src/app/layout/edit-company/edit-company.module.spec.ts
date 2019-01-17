import {EditCompanyModule} from './edit-company.module';

describe('EditCompanyModule', () => {
    let editCompanyModule:EditCompanyModule;

    beforeEach(() => {
        editCompanyModule = new EditCompanyModule();
    });

    it('should create an instance', () => {
        expect(editCompanyModule).toBeTruthy();
    });
});
