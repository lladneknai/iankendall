import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

/**
 * Skeletons that appear while the FileTree is building.
 */
const FileTreeSkeleton = () => {
  return (
    <Stack spacing={0.5}>
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
      <Skeleton variant="rounded" width={250} height={40} />
    </Stack>
  );
};

export default FileTreeSkeleton;
