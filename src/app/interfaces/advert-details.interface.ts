export interface AdvertDetailsInterface {
        id: string;
    user: {
        id: string;
        name: string;
        login: string;
    };
    name: string;
    description: string | null;
    isActive: boolean;
    imagesIds: string[];
    cost: number;
    email: string | null;
    phone: string;
    location: string;
    created: string;
    category: {
        id: string;
        parentId: string;
        name: string;
    };
}
