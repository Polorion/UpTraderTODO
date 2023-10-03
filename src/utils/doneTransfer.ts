export const doneTransfer = (done: string) => {
    switch (done) {
        case'готово':
            return 'done'
        case'в ожидании':
            return 'queue'
        case'в разработке':
            return 'develop'
        default:
            return 'queue';
    }

}