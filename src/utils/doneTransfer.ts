export const doneTransfer = (done: string) => {
    switch (done) {
        case'todoDone':
            return 'готово'
        case'todoQueue':
            return 'в ожидании'
        case'todoDevelop':
            return 'в разработке'
        default:
            return 'queue';
    }

}