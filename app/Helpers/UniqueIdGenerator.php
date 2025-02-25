<?php

namespace App\Helpers;

class UniqueIdGenerator
{
    private const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    private const ID_LENGTH = 5;

    private $workerId;

    private $lastTimestamp = -1;

    private $sequence = 0;

    public function __construct(int $workerId = 0)
    {
        $this->workerId = $workerId;
    }

    public function generateVideoId(): string
    {
        $timestamp = intval(microtime(true) * 1000);

        if ($timestamp === $this->lastTimestamp) {
            $this->sequence = ($this->sequence + 1) & 0x1FFF; // Increment sequence, wrap around at 4096
            if ($this->sequence === 0) {
                // Wait for the next millisecond
                while ($timestamp <= $this->lastTimestamp) {
                    $timestamp = intval(microtime(true) * 1000);
                }
            }
        } else {
            $this->sequence = 0;
        }

        $this->lastTimestamp = $timestamp;

        // Combine timestamp, worker ID, and sequence
        $uniqueValue = (
            (($timestamp & 0x1FFFFFFFFFF) << 22) |
            (($this->workerId & 0x1F) << 17) |
            ($this->sequence & 0x1FFF)
        );

        return $this->encodeBase62($uniqueValue);
    }

    private function encodeBase62(int $num): string
    {
        $baseLength = strlen(self::BASE62);
        $encoded = '';

        while ($num > 0) {
            $encoded = self::BASE62[$num % $baseLength].$encoded;
            $num = intval($num / $baseLength);
        }

        // Pad to ensure consistent length
        return str_pad($encoded, self::ID_LENGTH, self::BASE62[0], STR_PAD_LEFT);
    }
}
