import {AddVehicleModule} from './add-vehicle.module';

describe('AddVehicleModule', () => {
    let vehicleModule:AddVehicleModule;

    beforeEach(() => {
        vehicleModule = new AddVehicleModule();
    });

    it('should create an instance', () => {
        expect(vehicleModule).toBeTruthy();
    });
});
