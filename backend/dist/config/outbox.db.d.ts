import mongoose from 'mongoose';
declare const outbox_model: mongoose.Model<{
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & mongoose.DefaultTimestampProps, {
    id: string;
}, Omit<mongoose.DefaultSchemaOptions, "timestamps"> & {
    timestamps: true;
}> & Omit<{
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
    idempotent_key: string;
    status: "failed" | "pending" | "processing" | "success";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default outbox_model;
//# sourceMappingURL=outbox.db.d.ts.map