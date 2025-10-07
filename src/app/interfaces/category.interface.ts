export interface CategoryInterface {
    id: string,
    name: string
    parentId: string,
    items?: CategoryInterface[],
}
