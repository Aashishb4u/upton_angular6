import {ManageVehicleModule} from './manage-vehicle.module';

describe('ManageVehicleModule', () => {
    let vehicleModule:ManageVehicleModule;

    beforeEach(() => {
        vehicleModule = new ManageVehicleModule();
    });

    it('should create an instance', () => {
        expect(vehicleModule).toBeTruthy();
    });
});
