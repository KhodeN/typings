declare namespace angular {
    namespace permission {
        interface IStore {
            getStore(): any;
            clearStore(): void;
        }
        type Checker = (stateParams?: ng.ui.IStateParamsService, name?: string) => boolean | ng.IPromise<any>;

        interface IPermissionStore extends IStore {
            definePermission(name: string,
				handler: Checker): void;
            hasPermissionDefinition(name: string): boolean;
            defineManyPermissions(names: string[],
				handler: Checker): void;

            removePermissionDefinition(permission: string): void;
        }

        interface IRoleStore extends IStore {
            defineRole(name: string,
				subRoles: string[],
				handler?: Checker): void;
            removeRoleDefinition(name: string): void;
        }
    }
}