import {ManageDriverModule} from './manage-driver.module';

describe('ManageDriverModule', () => {
    let driverModule:ManageDriverModule;

    beforeEach(() => {
        driverModule = new ManageDriverModule();
    });

    it('should create an instance', () => {
        expect(driverModule).toBeTruthy();
    });
});
