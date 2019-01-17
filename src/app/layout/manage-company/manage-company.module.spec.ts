import {ManageCompanyModule} from './manage-company.module';

describe('ManageCompanyModule', () => {
    let manageModule:ManageCompanyModule;

    beforeEach(() => {
        manageModule = new ManageCompanyModule();
    });

    it('should create an instance', () => {
        expect(manageModule).toBeTruthy();
    });
});
