import {AddCompanyModule} from './add-company.module';

describe('AddCompanyModule', () => {
    let addCompanyModule:AddCompanyModule;

    beforeEach(() => {
        addCompanyModule = new AddCompanyModule();
    });

    it('should create an instance', () => {
        expect(addCompanyModule).toBeTruthy();
    });
});
