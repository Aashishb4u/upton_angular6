import {AddStoreModule} from './add-store.module';

describe('AddStoreModule', () => {
    let addStoreModule:AddStoreModule;

    beforeEach(() => {
        addStoreModule = new AddStoreModule();
    });

    it('should create an instance', () => {
        expect(addStoreModule).toBeTruthy();
    });
});
