import {ManageStoreModule} from './manage-store.module';

describe('ManageStoreModule', () => {
    let storeModule:ManageStoreModule;

    beforeEach(() => {
        storeModule = new ManageStoreModule();
    });

    it('should create an instance', () => {
        expect(storeModule).toBeTruthy();
    });
});
