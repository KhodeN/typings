declare namespace ym {
    // region From docs
    interface IEventEmitter {
        events: IEventManager;
    }
    /**
     * События: parentchange
     */
    interface IChild extends IEventEmitter {
        getParent(): any;
        setParent(parent: any): IChild;
    }
    interface IFreezable extends IEventEmitter {
        freeze(): IFreezable;
        isFrozen(): boolean;
        unfreeze(): IFreezable;
    }
    interface IOptionManager extends IChild, IEventEmitter, IFreezable {
        get<T>(key: string, defaultValue?: T): T;
        getAll(): any;
        getName(): string;
        getNative<T>(key: string): T;
        getParent(): IOptionManager;
        resolve(key: string, name: string): any;
        set(options: any): IOptionManager; // TODO
        setParent(parent: any): IChild;
    }
    interface IDataManager extends IEventEmitter {
        get<T>(path: string, defaultValue?: T): T;
        set<T>(path: string, value: T): void;
    }
    interface IParentOnMap {
        getMap(): IMap;
    }
    interface IControlParent extends IParentOnMap {
        state: IDataManager;
        getChildElement(child: IChild): ng.IPromise<Element>;
        getMap(): IMap;
    }
    interface IChildOnMap extends IChild {
        getParent(): IControlParent;
        setParent(parent: any): IChildOnMap;
    }
    /**
     * События optionschange
     */
    interface ICustomizable {
        options: IOptionManager;
    }

    interface IEvent {
        allowMapEvent(): void;
        callMethod(name: string): void;
        get(name: string): any;
        getSourceEvent(): IEvent;
        isDefaultPrevented(): boolean;
        isImmediatePropagationStopped(): boolean;
        isMapEventAllowed(): boolean;
        isPropagationStopped(): boolean;
        preventDefault(): void;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
    }

    interface IBaseGeometry extends IEventEmitter {
        getBounds(): number[][];
        getType(): string;
    }

    interface IPixelGeometry extends IBaseGeometry {
        equals(geometry: IGeometry): boolean;
        getMetaData(): any;
        scale(factor: number): IPixelGeometry;
        shift(offset: number[]): IPixelGeometry;
    }

    interface IGeometry extends IBaseGeometry, ICustomizable {
        getBounds(): number[][];
        getMap(): IMap;
        getPixelGeometry(options?: any): IPixelGeometry;
        setMap(map: IMap): void;
        getCoordinates(): number[];
        setCoordinates(coordinates: number[]): void;
    }

    interface IGeoObject extends IChildOnMap, ICustomizable, IDomEventEmitter, IParentOnMap {
        geometry?: IGeometry;
        properties: IDataManager;
        state: IDataManager;
    }
    // endregion

    interface IMain {
        Map: IMapStatic;
        Polyline: IGeoObjectStatic;
        Placemark: IGeoObjectStatic;
        Clusterer: IClustererStatic;
        GeoObjectCollection: IGeoObjectCollectionStatic;
        template: {
            filtersStorage: IStorage;
        };
        geocode: (points: number[], options: any) => PromiseLike<any>;
        templateLayoutFactory: {
            createClass(tpl: string, overrides?: any): ILayout;
        };
        ready(cb: Function): void;
    }

    interface IStorage {
        add(key: string, value: any): void;
    }

    interface IMapOptions {
        center: number[];
        zoom: number;
        controls: string[];
    }

    interface IEventManager {
        add(name: string, cb: Function): IEventManager;
    }

    interface ILayout {
        superclass: ILayout;
        build: Function;
        getElement(): Element;
        getData(): any;
    }

    interface IContainer {
        events: IEventManager;
        objects: IGeoObjectCollection;
    }

    interface IGeoObjectCollection extends IGeoObject, ICustomizable, IEventEmitter, IParentOnMap {
        add(obj: IChildOnMap|IClusterer): IGeoObjectCollection;
        remove(obj: IChildOnMap): IGeoObjectCollection;
    }

    interface IMap {
        geoObjects: IGeoObjectCollection;
        setBounds(bounds: number[], options?: any): ng.IPromise<any>;
        setCenter(center: number[], zoom?: number): ng.IPromise<any>;
    }

    interface IDomEventEmitter extends IEventEmitter {
    }

    interface IClusterer extends IChildOnMap, ICustomizable, IEventEmitter, IParentOnMap {
        add(objects: IGeoObject[]): IClusterer;
        remove(objects: IGeoObject[]): IClusterer;
        getBounds(): number[];
    }

    interface IMapStatic {
        new (id: string, options: IMapOptions): IMap;
    }

    interface IClustererStatic {
        new (options: any): IClusterer;
    }

    interface IGeoObjectStatic {
        new (geometry: any, properties: any, options: any): IGeoObject;
    }

    interface IGeoObjectCollectionStatic {
        new (properties?: any, options?: any): IGeoObjectCollection;
    }
}