import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace migration. */
export namespace migration {
  /** Properties of a Payload. */
  interface IPayload {
    /** Payload otpParameters */
    otpParameters?: migration.Payload.IOtpParameters[] | null;

    /** Payload version */
    version?: number | null;

    /** Payload batchSize */
    batchSize?: number | null;

    /** Payload batchIndex */
    batchIndex?: number | null;

    /** Payload batchId */
    batchId?: number | null;
  }

  /** Represents a Payload. */
  class Payload implements IPayload {
    /**
     * Constructs a new Payload.
     * @param [properties] Properties to set
     */
    constructor(properties?: migration.IPayload);

    /** Payload otpParameters. */
    public otpParameters: migration.Payload.IOtpParameters[];

    /** Payload version. */
    public version: number;

    /** Payload batchSize. */
    public batchSize: number;

    /** Payload batchIndex. */
    public batchIndex: number;

    /** Payload batchId. */
    public batchId: number;

    /**
     * Creates a new Payload instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Payload instance
     */
    public static create(properties?: migration.IPayload): migration.Payload;

    /**
     * Encodes the specified Payload message. Does not implicitly {@link migration.Payload.verify|verify} messages.
     * @param message Payload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: migration.IPayload,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Encodes the specified Payload message, length delimited. Does not implicitly {@link migration.Payload.verify|verify} messages.
     * @param message Payload message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: migration.IPayload,
      writer?: $protobuf.Writer
    ): $protobuf.Writer;

    /**
     * Decodes a Payload message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns Payload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): migration.Payload;

    /**
     * Decodes a Payload message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns Payload
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): migration.Payload;

    /**
     * Verifies a Payload message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null;

    /**
     * Creates a Payload message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns Payload
     */
    public static fromObject(object: { [k: string]: any }): migration.Payload;

    /**
     * Creates a plain object from a Payload message. Also converts values to other types if specified.
     * @param message Payload
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: migration.Payload,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any };

    /**
     * Converts this Payload to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };

    /**
     * Gets the default type url for Payload
     * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
     * @returns The default type url
     */
    public static getTypeUrl(typeUrlPrefix?: string): string;
  }

  namespace Payload {
    /** Algorithm enum. */
    enum Algorithm {
      ALGORITHM_UNSPECIFIED = 0,
      ALGORITHM_SHA1 = 1,
      ALGORITHM_SHA256 = 2,
      ALGORITHM_SHA512 = 3,
      ALGORITHM_MD5 = 4,
    }

    /** DigitCount enum. */
    enum DigitCount {
      DIGIT_COUNT_UNSPECIFIED = 0,
      DIGIT_COUNT_SIX = 1,
      DIGIT_COUNT_EIGHT = 2,
    }

    /** OtpType enum. */
    enum OtpType {
      OTP_TYPE_UNSPECIFIED = 0,
      OTP_TYPE_HOTP = 1,
      OTP_TYPE_TOTP = 2,
    }

    /** Properties of an OtpParameters. */
    interface IOtpParameters {
      /** OtpParameters secret */
      secret?: Uint8Array | null;

      /** OtpParameters name */
      name?: string | null;

      /** OtpParameters issuer */
      issuer?: string | null;

      /** OtpParameters algorithm */
      algorithm?: migration.Payload.Algorithm | null;

      /** OtpParameters digits */
      digits?: migration.Payload.DigitCount | null;

      /** OtpParameters type */
      type?: migration.Payload.OtpType | null;

      /** OtpParameters counter */
      counter?: number | Long | null;
    }

    /** Represents an OtpParameters. */
    class OtpParameters implements IOtpParameters {
      /**
       * Constructs a new OtpParameters.
       * @param [properties] Properties to set
       */
      constructor(properties?: migration.Payload.IOtpParameters);

      /** OtpParameters secret. */
      public secret: Uint8Array;

      /** OtpParameters name. */
      public name: string;

      /** OtpParameters issuer. */
      public issuer: string;

      /** OtpParameters algorithm. */
      public algorithm: migration.Payload.Algorithm;

      /** OtpParameters digits. */
      public digits: migration.Payload.DigitCount;

      /** OtpParameters type. */
      public type: migration.Payload.OtpType;

      /** OtpParameters counter. */
      public counter: number | Long;

      /**
       * Creates a new OtpParameters instance using the specified properties.
       * @param [properties] Properties to set
       * @returns OtpParameters instance
       */
      public static create(
        properties?: migration.Payload.IOtpParameters
      ): migration.Payload.OtpParameters;

      /**
       * Encodes the specified OtpParameters message. Does not implicitly {@link migration.Payload.OtpParameters.verify|verify} messages.
       * @param message OtpParameters message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: migration.Payload.IOtpParameters,
        writer?: $protobuf.Writer
      ): $protobuf.Writer;

      /**
       * Encodes the specified OtpParameters message, length delimited. Does not implicitly {@link migration.Payload.OtpParameters.verify|verify} messages.
       * @param message OtpParameters message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: migration.Payload.IOtpParameters,
        writer?: $protobuf.Writer
      ): $protobuf.Writer;

      /**
       * Decodes an OtpParameters message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns OtpParameters
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): migration.Payload.OtpParameters;

      /**
       * Decodes an OtpParameters message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns OtpParameters
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): migration.Payload.OtpParameters;

      /**
       * Verifies an OtpParameters message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null;

      /**
       * Creates an OtpParameters message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns OtpParameters
       */
      public static fromObject(object: {
        [k: string]: any;
      }): migration.Payload.OtpParameters;

      /**
       * Creates a plain object from an OtpParameters message. Also converts values to other types if specified.
       * @param message OtpParameters
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: migration.Payload.OtpParameters,
        options?: $protobuf.IConversionOptions
      ): { [k: string]: any };

      /**
       * Converts this OtpParameters to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any };

      /**
       * Gets the default type url for OtpParameters
       * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns The default type url
       */
      public static getTypeUrl(typeUrlPrefix?: string): string;
    }
  }
}
