import { InMemoryDatasource } from '../database/InMemoryDatasource';

export interface Context {
    userId: string;
    dataSources: {
        databaseAPI: InMemoryDatasource
    };
}
