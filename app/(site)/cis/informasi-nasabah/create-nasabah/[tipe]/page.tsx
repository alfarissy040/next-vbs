interface IParamSlug {
    tipe: string;
}

const PeroranganPage = ({ params }: { params: IParamSlug }) => {
    const { tipe } = params;
    return <>hi there {tipe}</>;
};

export default PeroranganPage;
