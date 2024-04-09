export const RequestedMigrate = (callback) => {
    const migrate = process.argv.indexOf('--migrate') !== -1


    if(migrate) {
        callback()
        return true;
    }

    return false;
}