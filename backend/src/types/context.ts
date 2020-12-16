import {DatasourceAPI} from "../database/DatasourceAPI";

export interface Context {
    userId: string;
    dataSources: {
        databaseAPI: DatasourceAPI
    };
}
