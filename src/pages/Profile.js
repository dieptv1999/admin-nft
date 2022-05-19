import {Container, Avatar, Paper} from "@mui/material";
import Page from "../components/Page";
import {deepPurple} from "@mui/material/colors";
import PRODUCTS from "../_mock/products";
import {ProductList} from "../sections/@dashboard/products";

function Profile() {
    return (
        <Page title="Profile">
            <Container>
                <div className="w-full">
                    <Paper
                        alt={'background'}
                        className="h-[300px] w-full rounded-xl -mb-[40px]"
                        style={{
                            backgroundImage: `url(https://demos.creative-tim.com/material-dashboard-react/static/media/bg-profile.af1219a742e09fc7b612.jpeg)`,
                            backgroundSize: 'cover',
                        }}
                    />
                    <div className="bg-white shadow-lg mx-[30px] z-10 rounded-xl p-4 flex flex-col">
                        <div className="flex items-center mb-8">
                            <Avatar sx={{bgcolor: deepPurple[500], height: '70px', width: '70px'}}>OP</Avatar>
                            <div className="flex flex-col ml-6">
                                <div className="text-2xl font-bold">Dieptv</div>
                                <div>Developer</div>
                            </div>
                        </div>
                        <ProductList products={PRODUCTS}/>
                    </div>
                </div>
            </Container>
        </Page>
    )
}

export default Profile