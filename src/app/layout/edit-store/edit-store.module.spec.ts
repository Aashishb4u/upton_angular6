import {EditStoreModule} from './edit-store.module';

describe('EditStoreModule', () => {
    let editStoreModule:EditStoreModule;

    beforeEach(() => {
        editStoreModule = new EditStoreModule();
    });

    it('should create an instance', () => {
        expect(editStoreModule).toBeTruthy();
    });
});
