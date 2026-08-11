<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    /**
     * Create a single notification for one user.
     */
    public static function create(
        int $userId,
        string $title,
        string $message,
        string $type = 'info',
        ?int $restaurantId = null,
        ?string $entityType = null,
        ?int $entityId = null,
        ?string $entityAction = null
    ): void {
        Notification::create([
            'user_id'       => $userId,
            'title'         => $title,
            'message'       => $message,
            'type'          => $type,
            'is_read'       => false,
            'restaurant_id' => $restaurantId,
            'entity_type'   => $entityType,
            'entity_id'     => $entityId,
            'entity_action' => $entityAction,
        ]);
    }

    /**
     * Create notifications for a list of user ids.
     */
    public static function notifyUsers(
        array $userIds,
        string $title,
        string $message,
        string $type = 'info',
        ?int $restaurantId = null,
        ?string $entityType = null,
        ?int $entityId = null,
        ?string $entityAction = null
    ): void {
        foreach (array_unique($userIds) as $userId) {
            self::create((int) $userId, $title, $message, $type, $restaurantId, $entityType, $entityId, $entityAction);
        }
    }

    /**
     * Notify every super admin.
     */
    public static function notifySuperAdmins(
        string $title,
        string $message,
        string $type = 'info',
        ?int $restaurantId = null,
        ?string $entityType = null,
        ?int $entityId = null,
        ?string $entityAction = null
    ): void {
        $ids = User::where('role', User::ROLE_SUPER_ADMIN)->pluck('id')->all();
        self::notifyUsers($ids, $title, $message, $type, $restaurantId, $entityType, $entityId, $entityAction);
    }

    /**
     * Notify the restaurant admins of a given restaurant.
     */
    public static function notifyRestaurantAdmins(
        int $restaurantId,
        string $title,
        string $message,
        string $type = 'info',
        ?string $entityType = null,
        ?int $entityId = null,
        ?string $entityAction = null
    ): void {
        $ids = User::where('role', User::ROLE_RESTAURANT_ADMIN)
            ->where('restaurant_id', $restaurantId)
            ->pluck('id')
            ->all();

        self::notifyUsers($ids, $title, $message, $type, $restaurantId, $entityType, $entityId, $entityAction);
    }

    /**
     * Notify both the restaurant admins of a restaurant AND every super admin.
     */
    public static function notifyRestaurantAndAdmins(
        int $restaurantId,
        string $title,
        string $message,
        string $type = 'info',
        ?string $entityType = null,
        ?int $entityId = null,
        ?string $entityAction = null
    ): void {
        $ids = User::whereIn('role', [User::ROLE_SUPER_ADMIN, User::ROLE_RESTAURANT_ADMIN])
            ->where(fn ($q) => $q->whereNull('restaurant_id')->orWhere('restaurant_id', $restaurantId))
            ->pluck('id')
            ->all();

        self::notifyUsers($ids, $title, $message, $type, $restaurantId, $entityType, $entityId, $entityAction);
    }
}
