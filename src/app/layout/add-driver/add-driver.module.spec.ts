import {AddDriverModule} from './add-driver.module';

describe('AddDriverModule', () => {
    let driverModule:AddDriverModule;

    beforeEach(() => {
        driverModule = new AddDriverModule();
    });

    it('should create an instance', () => {
        expect(driverModule).toBeTruthy();
    });
});
