import React from 'react';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Box,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { useThemeColors } from '@/ui/hooks';

const PostCardSkeleton = () => {
  const { cardBg, borderColor } = useThemeColors();

  return (
    <Card
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Image skeleton */}
      <Box position="relative" overflow="hidden" w="100%" h="200px">
        <Skeleton w="100%" h="100%" startColor="gray.100" endColor="gray.300" />
        {/* Badge skeleton */}
        <Box
          position="absolute"
          top={3}
          right={3}
          bg="rgba(255, 255, 255, 0.9)"
          backdropFilter="blur(8px)"
          borderRadius="full"
          p={1}
        >
          <Skeleton
            borderRadius="full"
            h="24px"
            w="80px"
            startColor="gray.100"
            endColor="gray.300"
          />
        </Box>
      </Box>

      <CardBody p={5} flex="1" display="flex" flexDirection="column">
        <VStack align="stretch" spacing={3} flex="1">
          {/* Title skeleton */}
          <Box minH="48px">
            <SkeletonText
              mt="2"
              noOfLines={2}
              spacing="2"
              skeletonHeight="4"
              startColor="gray.100"
              endColor="gray.300"
            />
          </Box>

          {/* Body text skeleton */}
          <Box flex="1">
            <SkeletonText
              mt="2"
              noOfLines={3}
              spacing="2"
              skeletonHeight="3"
              startColor="gray.100"
              endColor="gray.300"
            />
          </Box>

          {/* User info skeleton */}
          <HStack spacing={3} pt={2} borderTop="1px" borderColor={borderColor}>
            <SkeletonCircle
              size="8"
              startColor="gray.100"
              endColor="gray.300"
            />
            <VStack align="start" spacing={1} flex="1">
              <Skeleton
                height="4"
                width="100px"
                startColor="gray.100"
                endColor="gray.300"
              />
              <Skeleton
                height="3"
                width="120px"
                startColor="gray.100"
                endColor="gray.300"
              />
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default PostCardSkeleton;
