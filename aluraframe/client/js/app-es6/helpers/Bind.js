import {ProxyFactory} from '../services/ProxyFactory';

export class Bind{
    constructor(model, view, ...prop){
        let proxy = ProxyFactory.create(model, prop, (model) =>
            view.update(model)
        );

        view.update(model);

        return proxy;
    }
}