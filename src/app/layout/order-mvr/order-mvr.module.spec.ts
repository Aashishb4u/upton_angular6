import {OrderMvrModule} from './order-mvr.module';

describe('OrderMvrModule', () => {
    let orderModule:OrderMvrModule;

    beforeEach(() => {
        orderModule = new OrderMvrModule();
    });

    it('should create an instance', () => {
        expect(orderModule).toBeTruthy();
    });
});
