import { SafeUser } from "@/types";
import useLoginModel from "./useLogin";

interface IUseFoverites {
    listingId: string;
    currentUser: SafeUser | null
}

const useFoverites = ({
    listingId,
    currentUser
}: IUseFoverites) => {
    const router = useRouter()
    const LoginModel = useLoginModel()

    const hasFavorites = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFoverites = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (!currentUser) {
            return LoginModel.onOpen()
        }

        try {
            let request;

            if (hasFavorites) {
                request = () => axios.delete(`/api/foverites/${listingId}`)
            } else {
                request = () => axios.post(`/api/foverites/${listingId}`)
            }

            await request()
            router.refresh()
            toast.success("Success")

        } catch (error: any) {
            toast.error("Something went wrong")
        }
    }, [currentUser, hasFavorites, listingId, LoginModel, router])

    return {
        hasFavorites, toggleFoverites
    }

}


export default useFoverites