import * as Hapi from '@hapi/hapi';
declare const testPlugin: {
    name: string;
    register: (server: Hapi.Server) => Promise<void>;
};
export default testPlugin;
