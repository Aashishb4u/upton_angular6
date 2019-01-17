import {EditDriverModule} from './edit-driver.module';

describe('EditDriverModule', () => {
    let driverModule:EditDriverModule;

    beforeEach(() => {
        driverModule = new EditDriverModule();
    });

    it('should create an instance', () => {
        expect(driverModule).toBeTruthy();
    });
});
