export interface TransportOrder {
    id?: number;
    transport?: number | null;
    parent?: string;
    parent_id?: number;
    status?: string;
    created?: string;
    updated?: string;
    createdBy?: string;
    updatedBy?: string;
}
