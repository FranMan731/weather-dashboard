import { LatestSearchType } from "@/types/search";
import { Text, View } from "react-native";

export default function LatestSearches({ items, isLoading, isError, error }: LatestSearchType) {
    return (
        <View>
            <Text>
                Latest searches
            </Text>
        </View>
    )
}