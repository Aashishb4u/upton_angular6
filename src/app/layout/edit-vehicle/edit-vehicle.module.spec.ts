import {EditVehicleModule} from './edit-vehicle.module';

describe('EditVehicleModule', () => {
    let vehicleModule:EditVehicleModule;

    beforeEach(() => {
        vehicleModule = new EditVehicleModule();
    });

    it('should create an instance', () => {
        expect(vehicleModule).toBeTruthy();
    });
});
